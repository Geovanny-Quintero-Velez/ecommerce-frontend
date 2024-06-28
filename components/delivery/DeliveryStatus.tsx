"use client";

import React, { useEffect, useState } from "react";
import TimelineStep from "./TimelineStep";
import { useDeliveryContext } from "@/context/DeliveryContext";
import Link from "next/link";

const DeliveryStatus: React.FC = () => {
  const { deliveryState, updateDeliveryStatus } = useDeliveryContext();
  const [orderDelivered, setOrderDelivered] = useState(false);

  // Simulación del proceso de entrega
  useEffect(() => {
    const simulateDelivery = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      updateDeliveryStatus(1, "Preparing order", true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      updateDeliveryStatus(2, "Delivering order", true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      updateDeliveryStatus(3, "Order delivered", true);
      setOrderDelivered(true); // Marcar la orden como entregada
    };

    simulateDelivery();

    return () => {
      // Limpiar cualquier proceso de simulación si es necesario
    };
  }, [updateDeliveryStatus]);

  return (
    <div className="bg-white w-1/5 flex flex-col items-center pb-6 justify-center p-4 rounded-md shadow-md mt-4">
      <h2 className="text-lg font-bold mb-4 text-gray-900">
        Order Delivery Status
      </h2>
      <div className="space-y-4">
        {deliveryState.steps.map((step) => (
          <TimelineStep key={step.step} step={step.step} />
        ))}
      </div>
      {orderDelivered && (
        <div className="mt-5">
          <Link
            href={"/"}
            className="backgroundPrimary hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Confirm Delivery
          </Link>
        </div>
      )}
    </div>
  );
};

export default DeliveryStatus;
