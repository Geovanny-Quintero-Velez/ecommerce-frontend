import React from 'react';
import Image from 'next/image';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ProductCard = ({ product }: { product: any }) => {
  const { imageUrl, title, price, discountPrice, rating } = product;

  // Calcula las estrellas rellenadas y contorneadas según el rating decimal
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image className="w-full" src={imageUrl} alt={title} width={300} height={300} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="flex items-center mb-4">
          {discountPrice ? (
            <>
              <span className="mr-2 line-through text-gray-600">${price}</span>
              <div className="deleteStandard font-semibold text-end w-10/12">%{(((price-discountPrice)/price)*100).toFixed(1)}</div>
            </>
          ) : (
            <span className="text-transparent font-bold">${price}</span>
          )}
        </div>
        <div className="flex items-center">
        {discountPrice ? (
            <>
              <span className="text-xl textStandard font-bold">${discountPrice}</span>
            </>
          ) : (
            <span className="text-xl textStandard font-bold">${price}</span>
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
