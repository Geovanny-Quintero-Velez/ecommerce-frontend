"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/general/navbar/Navbar";
import PaymentCard from "../../components/payment/PaymentCard";
import AddressCard from "../../components/payment/AddressCard";
import PaymentTimeLine from "../../components/general/navbar/PaymentTimeline";
import PaypalLogo from "../../public/Paypal_logo.png";
import VisaMasterCardLogo from "../../public/visamastercard_logo.png";
import CheckoutCard from "@/components/payment/CheckoutCard";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
  { id: 1, name: "PayPal", logo: PaypalLogo.src },
  { id: 2, name: "Visa/MasterCard", logo: VisaMasterCardLogo.src },
];

const customSection = {
  sectionName: "PaymentTimeline",
  section: <PaymentTimeLine currentStep={2} />,
};

const PaymentPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { cart } = useCart();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);

  return isClient ? (
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
        <CheckoutCard cart={cart}/>
      </div>
    </div>
  ): null;
};

export default PaymentPage;
