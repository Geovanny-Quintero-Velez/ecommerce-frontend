import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Product } from '@/interfaces/product/product';

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { productid, images, name, price, discount, rating } = product;

  // Calcula las estrellas rellenadas y contorneadas según el rating decimal
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img 
      className="w-full fixed-image" // Aplica la clase CSS
      src={images ? images[0].img : ""} 
      alt={name} 
      decoding="sync"
      fetchPriority="high"
    />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="flex items-center mb-4">
          {discount ? (
            <>
              <span className="mr-2 line-through text-gray-600">${price}</span>
              <div className="deleteStandard font-semibold text-end w-10/12">%{discount}</div>
            </>
          ) : (
            <span className="text-transparent font-bold">${price}</span>
          )}
        </div>
        <div className="flex items-center">
        {discount ? (
              <>
                <span className="text-base font-bold textSecondary ">
                  COP ${(price*(1-(discount/100)))}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-gray-800 ">
                COP ${price}
              </span>
            )}
          <div className="w-10/12 flex items-center mr-2 justify-end">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="relative">
                {index < filledStars ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  index === filledStars && hasHalfStar ? (
                    <FaStarHalfAlt className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-gray-300" />
                  )
                )}
              </div>
            ))}
            <span className="textStandard">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
