import React from "react";

const CheckoutCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row p-4 bg-gray-200 rounded-lg animate-pulse">
      <div className="w-full  p-4">
        <div className="w-full mt-4 space-y-2">
          <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardSkeleton;
