import React from 'react';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";

const QuantityPicker = ({ quantity, setQuantity }: { quantity: number, setQuantity: (quantity: number) => void }) => {
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex items-center ml-4">
      <button className="px-2 py-1 border border-gray-300 rounded" onClick={decrease}>-</button>
      <span className="px-3 py-1 border-t border-b border-gray-300">{quantity}</span>
      <button className="px-2 py-1 border border-gray-300 rounded" onClick={increase}>+</button>
    </div>
  );
};

const CartCard = ({ product, removeProduct }: { product: any, removeProduct: (id: number) => void }) => {
  const { id, imageUrl, title, description, category, price, discountPrice, quantity, setQuantity } = product;

  return (
    <div className="flex p-4 bg-green-50 rounded-lg mb-4 shadow-sm">
      <Image className="w-24 h-24 object-cover rounded" src={imageUrl} alt={title} width={100} height={100} />
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold text-lg mb-1">{title}</div>
            <div className="text-gray-600 mb-2">{description}</div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{category}</span>
              <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <button className="ml-4" onClick={() => removeProduct(id)}>
            <FaRegTrashAlt className="text-red-500" />
          </button>
        </div>
        <div className="flex justify-end mt-2">
          {discountPrice ? (
            <>
              <span className="mr-2 line-through text-gray-600">COP {price.toFixed(2)}</span>
              <span className="text-green-500 font-bold">COP {discountPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-600 font-bold">COP {price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
