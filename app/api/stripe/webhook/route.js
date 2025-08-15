import connectdb from "@/lib/db";
import { buffer } from "micro";
import stripe from "@/lib/stripe";
import project from "@/lib/models/project";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
    const sig = req.headers.get("stripe-signature");
    const buf = await buffer(req); // <-- micro preserves raw body correctly
    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "payment_intent.succeeded") {
        console.log("✅ Payment succeeded webhook received");

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

            await fundedProject.validate();
            fundedProject.markModified("investors");
            await fundedProject.save();
        } catch (err) {
            console.error("DB save failed:", err);
            return new Response(`Save failed: ${err.message}`, { status: 500 });
        }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
}
