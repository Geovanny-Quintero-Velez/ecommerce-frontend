import React from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

const QuantityPicker = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex items-center ml-4">
      <button className="px-2 py-1 font-black" onClick={decrease}>
        -
      </button>
      <span className="px-3 py-1 border border-gray-300 rounded">
        {quantity}
      </span>
      <button className="px-2 py-1 font-black" onClick={increase}>
        +
      </button>
    </div>
  );
};

const CartCard = ({
  product,
  removeProduct,
}: {
  product: any;
  removeProduct: (id: number) => void;
}) => {
  const {
    id,
    imageUrl,
    title,
    description,
    category,
    price,
    discountPrice,
    quantity,
    setQuantity,
  } = product;

  return (
    <div className="flex p-4 backgroundSecondary-10 rounded-lg mb-4 shadow-lg">
      <Image
        className="w-36 h-48 object-cover rounded"
        src={imageUrl}
        alt={title}
      />
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold textStandard text-2xl mb-1">{title}</div>
            <div className="text-gray-600 mb-2">{description}</div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{category}</span>
              <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
              <div className="flex justify-end mt-2 w-4/5">
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
                  <span className="text-gray-600 font-bold">
                    COP {price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="ml-4" onClick={() => removeProduct(id)}>
            <FaRegTrashAlt className="deleteStandard" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
