"use client";

import React, { createContext, useContext, useState } from "react";

// Definir interfaces y tipos
interface DeliveryState {
  currentStep: number;
  steps: {
    step: number;
    status: string;
    isCompleted: boolean;
    current: boolean;
  }[];
}

interface DeliveryContextType {
  deliveryState: DeliveryState;
  updateDeliveryStatus: (step: number, status: string, isCompleted: boolean) => void;
}

// Crear el contexto
const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

// Proveedor del contexto
export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deliveryState, setDeliveryState] = useState<DeliveryState>({
    currentStep: 1,
    steps: [
      { step: 1, status: "Preparing order", isCompleted: false, current: false },
      { step: 2, status: "Delivering order", isCompleted: false, current: false },
      { step: 3, status: "Order delivered", isCompleted: false, current: false },
    ],
  });

  const updateDeliveryStatus = (step: number, status: string, isCompleted: boolean) => {
    setDeliveryState((prev) => ({
      ...prev,
      currentStep: step,
      steps: prev.steps.map((s) => ({
        ...s,
        current: s.step === step,
        status: s.step === step ? status : s.status,
        isCompleted: s.step === step ? isCompleted : s.isCompleted,
      })),
    }));
  };

  return (
    <DeliveryContext.Provider value={{ deliveryState, updateDeliveryStatus }}>
      {children}
    </DeliveryContext.Provider>
  );
};

// Función de utilidad para usar el contexto en otros componentes
export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDeliveryContext debe ser utilizado dentro de un DeliveryProvider");
  }
  return context;
};