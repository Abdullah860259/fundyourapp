import stripe from "@/lib/stripe";

export async function POST(req) {
    const sig = req.headers.get("stripe-signature");
    const body = await req.text();

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        console.log("💰 Payment successful:", paymentIntent.id);
        // Update order in DB
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
}
