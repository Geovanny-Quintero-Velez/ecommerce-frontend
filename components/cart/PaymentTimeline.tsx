import {FaCheck } from "react-icons/fa";

interface Props {
    currentStep: number
}

function PaymentTimeline({currentStep}: Props) {  
    const TimeLineStep: React.FC<{
        step: number;
        currentStep: number;
        label: string;
      }> = ({ step, currentStep, label }) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
      
        return (
          <div className="flex items-center text-white">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                isActive ? "bg-white textPrimary" : "border-2 border-white"
              } ${isCompleted ? "border-2 border-white text-white" : ""}`}
            >
              {isCompleted ? <FaCheck /> : step}
            </div>
            <div className={`ml-2 text-white ${isActive ? " font-semibold" : ""}`}>
              {label}
            </div>
            {step < 3 && <div className="mx-2 h-px w-16 bg-white" />}
          </div>
        );
      };

    return (
        <div className="flex items-center space-x-8">
        <TimeLineStep step={1} currentStep={currentStep} label="Cart" />
        <TimeLineStep step={2} currentStep={currentStep} label="Payment" />
        <TimeLineStep
          step={3}
          currentStep={currentStep}
          label="Follow your product"
        />
      </div>
    );
    }

export default PaymentTimeline;