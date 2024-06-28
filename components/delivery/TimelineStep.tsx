import { useDeliveryContext } from "@/context/DeliveryContext";
import React from "react";
import { FaCheck } from "react-icons/fa";


const TimelineStep = ({ step }: { step: number }) => {
  const { deliveryState } = useDeliveryContext();
  const currentStep = deliveryState.steps.find((s) => s.step === step);

  if (!currentStep) return null;

  const isActive = currentStep.step === deliveryState.currentStep;

  return (
    <div className={`flex items-center text-white`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center backgroundSecondary`}>
        {currentStep.isCompleted ? <FaCheck /> : <span className="text-sm font-bold">{step}</span>}
      </div>
      <div className={`ml-2 font-bold textStandard`}>{currentStep.status}</div>
    </div>
  );
};

export default TimelineStep;