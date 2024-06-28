"use client"
import React from 'react';

const ProductCarouselSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <div className="product-carousel relative px-10 py-10 rounded-lg bg-white shadow-lg mt-16">
      <div className="flex space-x-4">
        {skeletonItems.map((_, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="w-64 h-48 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-32 h-6 bg-gray-200 animate-pulse mt-4 rounded"></div>
            <div className="w-20 h-6 bg-gray-200 animate-pulse mt-2 rounded"></div>
            <div className="w-16 h-6 bg-gray-200 animate-pulse mt-2 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarouselSkeleton;
