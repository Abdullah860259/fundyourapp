import connectdb from "@/lib/db";
import user from "@/lib/models/user";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function GET(request) {
    await connectdb();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id");
    const clientId = user.connectedAccountId;
    console.log(clientId);
    if (!clientId) {
        return NextResponse.json(false)
    }
    try {
        await stripe.oauth.deauthorize({
            client_id: process.env.STRIPE_CLIENT_ID,
            stripe_user_id: user.connectedAccountId
        });
        await user.findByIdAndUpdate(id, { $unset: { connectedAccountId: "" } })
    } catch (error) {
        console.error(error);
        return NextResponse.json(false)
    }
    return NextResponse.json(true)
}