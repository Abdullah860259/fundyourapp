import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { json } from 'micro';
import connectdb from '@/lib/db';
import project from '@/lib/models/project';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  let event;

  try {
    const stripeSignature = (await headers()).get('stripe-signature');

    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log('✅ Success:', event.id);

  const permittedEvents = [
    'checkout.session.completed',
    'payment_intent.succeeded',
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          try {
            const paymentIntent = event.data.object;
            const metaData = paymentIntent.metadata;
            let session;
            console.log(typeof metaData.session);
            if (typeof metaData.session === "string") {
              session = JSON.parse(metaData.session);
            } else {
              session = metaData.session;
            }

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
          break;
        }
        case 'payment_intent.succeeded': {
          try {
            const paymentIntent = event.data.object;
            const metaData = paymentIntent.metadata;
            let session;
            console.log(typeof metaData.session,"✅✅✅✅✅✅✅✅");
            if (typeof metaData.session === "string") {
              session = JSON.parse(metaData.session);
            } else {
              session = metaData.session;
            }

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
          break;
        }
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: 'Received' }, { status: 200 });
}
