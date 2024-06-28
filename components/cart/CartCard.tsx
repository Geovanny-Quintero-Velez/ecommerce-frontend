import React from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCart } from '@/context/CartContext';
import {CartProduct} from '@/interfaces/product/cart.product';
import defaultIMG from '@/public/producto-stock-estandar.png';

const QuantityPicker = ({ id, quantity } : { id: string; quantity: number; }) => {
  const { increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex items-center">
      <button
        className="px-2 py-1 font-black bg-red-500 text-white rounded transition duration-200 hover:bg-red-600"
        onClick={() => decreaseQuantity(id)}
      >
        -
      </button>
      <span className="px-3 py-1 mx-2 border border-gray-300 rounded">
        {quantity}
      </span>
      <button
        className="px-2 py-1 font-black bg-green-500 text-white rounded transition duration-200 hover:bg-green-600"
        onClick={() => increaseQuantity(id)}
      >
        +
      </button>
    </div>
  );
};

const CartCard = ({ product, removeProduct } : { product: CartProduct; removeProduct: (id: string) => void; }) => {
  const {
    id,
    name,
    price,
    quantity,
    imageUrl,
    description,
    category,
    discountPercentage,
  } = product;

  return (
    <div className="flex flex-col md:flex-row p-4 backgroundSecondary-10 rounded-lg mb-4 shadow-lg">
      <div className="w-full md:w-36 h-48 md:h-auto relative">
        <Image
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl || defaultIMG}
          alt={name}
          layout="fill"
        />
      </div>
      <div className="flex-1 ml-0 md:ml-4 flex flex-col justify-between mt-4 md:mt-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-2xl text-gray-800 mb-1">{name}</h2>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-gray-500">{category}</p>
          </div>
          <button
            className="ml-4 text-red-500 hover:text-red-600 transition duration-200"
            onClick={() => removeProduct(id)}
          >
            <FaRegTrashAlt className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <QuantityPicker id={id} quantity={quantity} />
          <div className="flex flex-col items-end">
            {discountPercentage ? (
              <>
                <span className="text-gray-600 line-through">
                  COP ${price}
                </span>
                <span className="text-lg font-bold text-green-600">
                  COP ${(price*(1-(discountPercentage/100)))}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                COP ${price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
