import React from "react";

const SkeletonPaymentCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
      <div className="bg-gray-300 h-10 w-full mb-4"></div>
    </div>
  );
};

export default SkeletonPaymentCard;
