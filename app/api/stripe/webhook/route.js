// File: /app/api/stripe/webhook/route.js
import connectdb from "@/lib/db";
import Stripe from "stripe";
import project from "@/lib/models/project";
import { buffer } from "micro";

export const config = {
  api: { bodyParser: false }, // important
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log("✅ Payment succeeded webhook received");
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer()); // raw body
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("🚨 Verification failed:", err.message);
    console.log("Payload length:", buf.length);
    console.log("payload",buf.toString());
    console.log("Signature header:", sig);
    console.log("Secret present:", process.env.STRIPE_WEBHOOK_SECRET ? "Yes" : "No");
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded" || event.type === "charge.succeeded") {
    try {
      const paymentIntent = event.data.object;
      const metaData = paymentIntent.metadata;
      const session = JSON.parse(metaData.session);

      await connectdb();

      const fundedProject = await project.findById(metaData.projectId);
      if (!fundedProject) return new Response("Project not found", { status: 404 });

      fundedProject.investors.push({
        userid: session.user.id,
        user: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        },
        amount: paymentIntent.amount / 100,
        date: new Date(),
      });

      fundedProject.markModified("investors");
      await fundedProject.save();
    } catch (err) {
      console.error("DB save failed:", err);
      return new Response(`Save failed: ${err.message}`, { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
