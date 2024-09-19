import { useState } from "react";
import { ProductItem } from "../libs/types";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "./Spinner";

const { VITE_STRIPE_PUBLISHABLE_KEY } = import.meta.env;

const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);

const PayButton = ({ products }: { products: ProductItem[] }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },

        unit_amount: product.price * 100,
      },

      quantity: product.quantity,
    }));

    try {
      setIsProcessing(true);
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe is null");
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      const session = await response.json();

      console.log(session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleCheckout}
        className="bg-primary-red font-500 w-full rounded-full py-4 text-white transition-colors duration-300 hover:bg-rose-900"
      >
        {isProcessing ? <Spinner /> : "Confirm Order"}
      </button>
    </div>
  );
};

export default PayButton;
