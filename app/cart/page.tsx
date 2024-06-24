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
      <div className="flex p-6 backgroundBackground min-h-screen">
        <div className="flex-1 overflow-y-auto pr-6">
          <h1 className="text-2xl font-bold mb-6 textStandard">Delicious choices...</h1>
          {cart.map((product) => (
            <CartCard
              key={product.id}
              product={product}
              removeProduct={removeFromCart}
            />
          ))}
        </div>
        <div className="w-1/3">
        <CartSummaryComponent />
        </div>
      </div>
    </div> :
    null
  );
};

export default CartPage;
