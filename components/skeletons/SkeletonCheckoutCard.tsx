import React from "react";

const SkeletonCheckoutCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-md shadow-md">
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
    </div>
  );
};

export default SkeletonCheckoutCard;
