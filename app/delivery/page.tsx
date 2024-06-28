import React from "react";
import Navbar from "@/components/general/navbar/Navbar";
import DeliveryStatus from "@/components/delivery/DeliveryStatus";
import PaymentTimeLine from "../../components/general/navbar/PaymentTimeline";
import { DeliveryProvider } from "@/context/DeliveryContext";

const customSection = {
  sectionName: "PaymentTimeline",
  section: <PaymentTimeLine currentStep={3} />,
};

const DeliveryPage = () => {
  return (
    <DeliveryProvider>
      <div>
        <Navbar customSection={customSection}/>
        <div className="flex justify-center items-center container mx-auto p-4">
          <DeliveryStatus />
        </div>
      </div>
    </DeliveryProvider>
  );
};

export default DeliveryPage;
