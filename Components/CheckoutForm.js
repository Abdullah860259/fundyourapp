"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ creatorId, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, creatorId }),
    });

    const { clientSecret } = await res.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: elements.getElement(CardElement) } }
    );

    if (error) alert(error.message);
    else if (paymentIntent.status === "succeeded") alert("Payment Successful!");

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
