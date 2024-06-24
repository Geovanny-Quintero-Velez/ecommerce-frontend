import React from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCart } from '@/context/CartContext';

const QuantityPicker = ({ id, quantity }: { id: string; quantity: number; }) => {
  const { increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex items-center ml-4">
      <button className="px-2 py-1 font-black" onClick={() => decreaseQuantity(id)}>
        -
      </button>
      <span className="px-3 py-1 border border-gray-300 rounded">
        {quantity}
      </span>
      <button className="px-2 py-1 font-black" onClick={() => increaseQuantity(id)}>
        +
      </button>
    </div>
  );
};

const CartCard = (
  { product, removeProduct, }: { product: any; removeProduct: (id: string) => void; }
  ) => {
  
  const {
    id,
    name,
    price,    
    quantity,
    imageUrl,
    description,
    category,
    discountPrice
  } = product;

  return (
    <div className="flex p-4 backgroundSecondary-10 rounded-lg mb-4 shadow-lg">
      <Image
        className="w-36 h-48 object-cover rounded"
        src={imageUrl}
        alt={name}
        width={36}
        height={48}
      />
      <div className="flex-1 ml-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold textStandard text-2xl mb-1">{name}</div>
            <div className="text-gray-600 mb-2">{description}</div>
          </div>
          <button className="ml-4" onClick={() => removeProduct(id)}>
            <FaRegTrashAlt className="deleteStandard" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-500 mr-4">{category}</span>
          <QuantityPicker id={id} quantity={quantity} />
          <div className="flex justify-end w-4/5">
            {discountPrice ? (
              <>
                <span className="mr-2 line-through text-gray-600">
                  COP {price.toFixed(2)}
                </span>
                <span className="textStandard text-lg font-bold">
                  COP {discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="textStandard text-lg font-bold">
                COP {price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
