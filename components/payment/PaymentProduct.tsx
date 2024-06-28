"use client"

import React from "react";

const PaymentProduct = ({
  product,
}: {
  product: any;
}) => {
  const {
    name,
    price,
    discountPrice,
  } = product;

  const validPrice = typeof price === 'number' ? price : 0;
  const validDiscountPrice = typeof discountPrice === 'number' ? discountPrice : null;


  return (
    <div className="flex backgroundBackground rounded-lg p-4 ">
      <div className="flex w-1/2 text-lg font-medium text-Standard justify-start">{name}</div>
      <div className="flex w-1/2 justify-end">
        {discountPrice ? (
          <span className="text-lg font-bold text-Standard">
            COP {discountPrice.toFixed(2)}
          </span>
        ) : (
          <span className="text-lg font-bold text-Standard">
            COP {validPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default PaymentProduct;
