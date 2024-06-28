"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartProduct } from '@/interfaces/product/cart.product';
import { useAuth } from '@/context/UserContext';
import { getAuthHeader } from '@/utils/auth/get-auth-header';

interface CartContextType {
  cart: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchCart = async () => {
    if (!currentUser) {
      return;
    }

    try {
      const { Authorization } = getAuthHeader();
      const response = await fetch(`http://localhost:3000/api/v1/order/user/${currentUser.userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization // Suponiendo que el token de autenticación está almacenado en el localStorage
        }
      });
      const data = await response.json();
      if (data.order && data.order.orderid) {
        setOrderId(data.order.orderid); // Configura el orderId
      }
      if (data.orderDetails) {
        const cartItems = data.orderDetails.map((orderDetail: any) => ({
          id: orderDetail.productid,
          name: orderDetail.product.name,
          price: parseFloat(orderDetail.product.price),
          imageUrl: orderDetail.product.images[0]?.img || '',
          description: orderDetail.product.description,
          category: orderDetail.product.categories[0]?.category || '',
          discountPercentage: parseFloat(orderDetail.product.discount) || 0,
          quantity: orderDetail.quantity
        }));
        setCart(cartItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const syncCartWithServer = async (cart: CartProduct[]) => {
    if (!currentUser || !orderId) {
      return;
    }

    const items = cart.map(item => ({
      orderid: orderId,
      productid: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    try {
        const { Authorization } = getAuthHeader();
      await fetch('http://localhost:3000/api/v1/shopping-cart/item', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization // Suponiendo que el token de autenticación está almacenado en el localStorage
        },
        body: JSON.stringify({ orderid: orderId, items })
      });
    } catch (error) {
      console.error('Error syncing cart with server:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    syncCartWithServer(cart);
  }, [cart]);

  const addToCart = (item: CartProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = async (id: string) => {
    try {
      const { Authorization } = getAuthHeader();
    await fetch(`http://localhost:3000/api/v1/shopping-cart/item/${orderId}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization // Suponiendo que el token de autenticación está almacenado en el localStorage
      },
    });
  } catch (error) {
    console.error('Error deleting cart item:', error);
  }
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
