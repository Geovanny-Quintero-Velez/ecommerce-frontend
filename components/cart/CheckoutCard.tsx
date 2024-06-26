"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import PaymentProduct from "./PaymentProduct";
import CheckoutCardSkeleton from "./skeleton/CheckoutCardSkeleton";

const CheckoutCard = () => {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const serviceFee = 20000;

  if (!isClient) {
    return null; // o un loader si prefieres
  }

  return (
    <div className="h-fit p-6 bg-white shadow-lg rounded-lg max-w-full md:max-w-lg mx-auto md:mx-0 textStandard mt-6 md:mt-0">
      <h2 className="text-2xl font-medium mb-4">Checkout</h2>
      {false ?(<div className="flex h-60 overflow-y-scroll flex-col gap-2">
        {cart.length > 0 ? (
          cart.map((product) => (
            <PaymentProduct key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            {" "}
            Here you will find the products you add to the cart
          </p>
        )}
      </div>):(<CheckoutCardSkeleton/>)}
      <div className="flex justify-between mt-4">
        <div className="text-gray-700">Subtotal</div>
        <div className="text-gray-700">COP {totalPrice.toFixed(2)}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-gray-700">Service Fee</div>
        <div className="text-gray-700">COP {serviceFee}</div>
      </div>
      <div className="flex justify-between mt-4 text-lg font-medium">
        <div>Total</div>
        <div>COP {(totalPrice + serviceFee).toFixed(2)}</div>
      </div>
      <div className="flex w-full justify-center mt-4">
        <button className="p-2 rounded-lg flex justify-center items-center backgroundWarning w-full mr-2 text-xl font-bold">
          Pay now
        </button>
      </div>
      <div className="text-center mt-4">
        <p>
          Do you want to explore more?{" "}
          <a href="/" className="text-primary underline">
            Return to the store
          </a>
        </p>
      </div>
    </div>
  );
};

export default CheckoutCard;
