import stripe from "@/lib/stripe";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

export async function POST(req) {
  try {
    await connectDB();
    const { amount, creatorId } = await req.json();

    const creator = await User.findById(creatorId);
    if (!creator || !creator.connectedAccountId) {
      return new Response("Creator not found", { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Support Creator" },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancelled`,
      payment_intent_data: {
        application_fee_amount: Math.floor(amount * 0.1), // 10% fee
        transfer_data: {
          destination: creator.connectedAccountId,
        },
      },
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
