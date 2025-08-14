"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster, toast } from 'sonner';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutWrapper({ amount, creatorId, projectId,session, loadingstart, loadingstop }) {

  const handleClick = async () => {
    loadingstart()
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast.error("Enter a valid Amount");
      loadingstop();
      return;
    }
    try {
      const frontendSession = session;
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, creatorId, projectId, frontendSession}),
      });
      const { id } = await res.json();
      if (res.status === 500) {
        toast.error("Backend Server Issue")
        return;
      }
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (err) {
      toast.error("Error redirecting:", err);
    } finally {
      loadingstop();
    }
  };
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton={true}
        duration={4000}  // milliseconds, default is 5000
        toastOptions={{
          success: {
            style: { background: '#22c55e', color: '#fff' },
            icon: '✅',
          },
          error: {
            style: { background: '#ef4444', color: '#fff' },
            icon: '❌',
          },
        }}
      />
      <button
        onClick={handleClick}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </>
  );
}
