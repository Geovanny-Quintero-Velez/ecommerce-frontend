"use client"

import React from "react";
import Image from "next/image";

interface PaymentCardProps {
  paymentMethods: { id: number; name: string; logo: string }[];
  selectedPaymentMethod: number;
  onSelectPaymentMethod: (id: number) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  paymentMethods,
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded gap-3 shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Payment methods</h2>
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`rounded-lg p-2 mb-2 cursor-pointer ${
            selectedPaymentMethod === method.id
              ? "backgroundSecondary"
              : "bg-gray-100"
          }`}
          onClick={() => onSelectPaymentMethod(method.id)}
        >
          <Image
            src={method.logo}
            alt={method.name}
            width={80}
            height={80}
            className="inline-block mt-3 mb-3 ml-3 mr-3 bg-white"
          />
          <span
            className={`font-semibold text-lg ml-2 ${
              selectedPaymentMethod === method.id
                ? " text-white"
                : "textStandard"
            }`}
          >
            {method.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;
