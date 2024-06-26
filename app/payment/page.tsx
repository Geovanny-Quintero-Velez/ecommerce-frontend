"use client";

import React, { useState } from "react";
import Navbar from "@/components/general/navbar/Navbar";
import PaymentCard from "../../components/cart/PaymentCard";
import AddressCard from "../../components/cart/AddressCard";
import PaymentTimeLine from "../../components/cart/PaymentTimeline";
import PaypalLogo from "../../public/Paypal_logo.png";
import VisaMasterCardLogo from "../../public/visamastercard_logo.png";
import CheckoutCard from "@/components/cart/CheckoutCard";

const paymentMethods = [
  { id: 1, name: "PayPal", logo: PaypalLogo.src },
  { id: 2, name: "Visa/MasterCard", logo: VisaMasterCardLogo.src },
];

const customSection = {
  sectionName: "PaymentTimeline",
  section: <PaymentTimeLine currentStep={2} />,
};

const PaymentPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);

  return (
    <div>
      <Navbar customSection={customSection} />
      <div className="flex-col md:flex-row flex p-6 backgroundBackground min-h-screen">
        <div className="flex-1 overflow-y-auto pr-6">
          <PaymentCard
            paymentMethods={paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            onSelectPaymentMethod={setSelectedPaymentMethod}
          />
          <AddressCard />
        </div>
        <CheckoutCard />
      </div>
    </div>
  );
};

export default PaymentPage;
