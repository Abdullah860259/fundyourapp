import stripe from "@/lib/stripe";
import connectdb from "@/lib/db";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";


export async function GET(req) {
    const session = await getServerSession({ req, ...authOptions });
    const userId = session.user.id;
    if (!session || !session.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) {
        return new Response(`Missing Code`, { status: 400 });
    }
    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code
        })
        const connectedAccountId = response.stripe_user_id;
        await connectdb();
        await User.findByIdAndUpdate(userId, { connectedAccountId }, { new: true }); 
        return new Response(null, {
            status: 302,
            headers: { Location: "/settings" },
        });
    } catch (error) {
        console.error(error);
        return new Response('Internel Server Error', { status: 500 });
    }
}