import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import PaymentProduct from "./PaymentProduct";
import CheckoutCardSkeleton from "../cart/skeleton/CheckoutCardSkeleton";
import { CartProduct } from "@/interfaces/product/cart.product";
import Link from "next/link";
import axios from "axios";
import dropin, { Dropin } from 'braintree-web-drop-in';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

interface Props {
  cart: CartProduct[];
}

const CheckoutCard = ({ cart }: Props) => {

  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [dropinInstance, setDropinInstance] = useState<Dropin | null | undefined>(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const initializeBraintree = async () => {
      try {
        const response = await axios.get(`${baseURL}/payment/client/token`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
          }
        });
        const clientToken = response.data;

        // Inicializar el drop-in de Braintree
        dropin.create({
          authorization: clientToken,
          container: '#dropin-container',
          paypal: {
            flow: 'vault'
          }
        }, (error, instance) => {
          if (error) {
            console.error('Error initializing Braintree Drop-in:', error);
            return;
          }
          setDropinInstance(instance);
        });
      } catch (error) {
        console.error('Error initializing Braintree:', error);
      }
    };

    initializeBraintree();

    return () => {
      if (dropinInstance) {
        dropinInstance.teardown();
      }
    };
  }, [baseURL]);

  const handleCheckout = async () => {
    if (!dropinInstance) {
      console.error('Braintree Drop-in not initialized');
      return;
    }

    try {
      dropinInstance.requestPaymentMethod(async (error, payload) => {
        if (error) {
          console.error('Error requesting payment method:', error);
          return;
        }

        await sendPaymentDataToBackend(payload.nonce);
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const sendPaymentDataToBackend = async (nonce: string) => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20000; // Ajusta la cantidad total aquí

    const paymentData = {
      orderid: "b79ec1ef-6384-4a07-8e7a-645250ff5ca1", // Reemplazar con el ID de la orden real
      amount: totalAmount,
      status: "PROGRESS",
      paymentmethod: nonce
    };

    try {
      const response = await axios.post(`${baseURL}/payment`, paymentData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`, 
        }
      });

      console.log('Payment processed successfully:', response.data);
       // Navegar a la página de éxito
       router.push('/delivery'); // Cambia '/delivery' por la ruta a la página de éxito
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const serviceFee = 20000;

  return (
    <div className="h-fit p-6 bg-white shadow-lg rounded-lg max-w-full md:max-w-lg mx-auto md:mx-0 textStandard mt-6 md:mt-0">
      <h2 className="text-2xl font-medium mb-4">Checkout</h2>
      <div className="flex h-60 overflow-y-scroll flex-col gap-2">
        {cart.length > 0 ? (
          cart.map((product) => (
            <PaymentProduct key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">Here you will find the products you add to the cart</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-gray-700">Subtotal</div>
        <div className="text-gray-700">COP {totalPrice.toFixed(2)}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-gray-700">Service Fee</div>
        <div className="text-gray-700">COP {serviceFee}</div>
      </div>
      <div className="flex justify-between mt-4 text-lg font-medium">
        <div>Total</div>
        <div>COP {(totalPrice + serviceFee).toFixed(2)}</div>
      </div>
      <div id="dropin-container" className="my-4"></div>
      <div className="flex w-full justify-center mt-4">
        <button onClick={handleCheckout} className="p-2 rounded-lg flex justify-center items-center backgroundWarning w-full mr-2 text-xl font-bold">
          Pay now
        </button>
      </div>
      <div className="text-center mt-4">
        <p>
          Do you want to explore more?{' '}
          <a href="/" className="text-primary underline">
            Return to the store
          </a>
        </p>
      </div>
    </div>
  );
};

export default CheckoutCard;
