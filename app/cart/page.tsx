"use client";

import React, { useState, useEffect } from "react";
import CartCard from "../../components/cart/CartCard";
import PaymentTimeLine from "../../components/cart/PaymentTimeline";
import Navbar from "@/components/general/navbar/Navbar";
import CartSummaryComponent from '@/components/cart/CartSummaryComponent';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, []);

  const { cart, removeFromCart } = useCart();

  const customSection = {
    sectionName: "PaymentTimeline",
    section: <PaymentTimeLine currentStep={1} />,
  };

  return (
    isClient ?
    <div>
      <Navbar customSection={customSection}/>
      <div className="flex-col md:flex-row flex p-6 backgroundBackground min-h-screen">
        <div className="flex-1 overflow-y-auto pr-6">
          <h1 className="text-2xl font-bold mb-6 textStandard">{cart.length === 0? "Start a shopping cart!": "Delicious choices..."}</h1>
          {
          cart.length > 0 ?
          cart.map((product) => (
            <CartCard
              key={product.id}
              product={product}
              removeProduct={removeFromCart}
            />
          )):
          <p className="text-center text-gray-500"> Here you will find the products you add to the cart</p>
          }
        </div>
        <CartSummaryComponent />
      </div>
    </div> :
    null
  );
};

export default CartPage;
