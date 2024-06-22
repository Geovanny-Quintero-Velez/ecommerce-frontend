"use client";

import React, { useState } from "react";
import CartCard from "../../components/cart/CartCard"; // Asegúrate de que la ruta sea correcta
import productImage from "../../public/producto-stock-estandar.png";
import PaymentNavbar from "../../components/cart/PaymentNavbar";

const initialCart = [
  {
    id: 1,
    title: "Olla Multifuncional IMUSA Multichef PRO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper laoreet erat et condimentum. Ut mollis ligula tincidunt tortor volutpat viverra. Cras vel augue ut leo dapibus varius. Curabitur scelerisque facilisis tortor eu finibus. Proin varius suscipit neque vel dapibus. Morbi sit amet mollis nunc, id fermentum sem. Aliquam a accumsan massa.",
    category: "Kitchen",
    imageUrl: productImage,
    price: 200000,
    discountPrice: 150000,
    quantity: 1,
  },
  {
    id: 2,
    title: "Olla Multifuncional IMUSA Multichef PRO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper laoreet erat et condimentum. Ut mollis ligula tincidunt tortor volutpat viverra. Cras vel augue ut leo dapibus varius. Curabitur scelerisque facilisis tortor eu finibus. Proin varius suscipit neque vel dapibus. Morbi sit amet mollis nunc, id fermentum sem. Aliquam a accumsan massa.",
    category: "Kitchen",
    imageUrl: productImage,
    price: 200000,
    discountPrice: 150000,
    quantity: 2,
  },
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const removeProduct = (id: number) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const setQuantity = (id: number, quantity: number) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const totalPrice = cart.reduce(
    (acc, product) =>
      acc + (product.discountPrice || product.price) * product.quantity,
    0
  );
  const serviceFee = totalPrice * 0.02;
  const totalWithFee = totalPrice + serviceFee;

  return (
    <div>
      <PaymentNavbar currentStep={3} />
      <div className="flex p-6 backgroundBackground min-h-screen">
        <div className="flex-1 overflow-y-auto pr-6">
          <h1 className="text-2xl font-bold mb-6">My shopping cart</h1>
          {cart.map((product) => (
            <CartCard
              key={product.id}
              product={{
                ...product,
                setQuantity: (quantity: number) =>
                  setQuantity(product.id, quantity),
              }}
              removeProduct={removeProduct}
            />
          ))}
        </div>
        <div className="w-1/3">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="text-xl font-bold mb-4">Summary</div>
            <button className="w-full backgroundSecondary font-bold text-white py-2 rounded mb-4">
              Proceed to checkout
            </button>
            <div className="textStandar mb-2 flex justify-between">
              <span>{cart.length} products</span>
              <span>COP {totalPrice.toFixed(2)}</span>
            </div>
            <div className="textStandar mb-2 flex justify-between">
              <span>Service fee</span>
              <span>COP {serviceFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="textStandar text-xl font-bold mb-4 flex justify-between">
              <span>Total:</span>
              <span>COP {totalWithFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="mt-4 text-center">
              <p  className="textStandar">
                Do you want to explore more? <a href="/" className="textSecondary font-bold">Return to the store</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
