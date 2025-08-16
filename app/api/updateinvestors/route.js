import connectdb from "@/lib/db";
import user from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectdb();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const userData = await user.findById(id);
        console.log(userData);
        return new NextResponse(userData.settings.showInvestors, { status: 500 });    
    } catch (error) {
        console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req) {   
    try {
        await connectdb();
        const body = await req.json();
        const { userid, showInvestors } = body;
        const updatedUserData = await user.findByIdAndUpdate(
            userid,
            {"settings.showInvestors":showInvestors},
            {new:true}
        )
        if (!updatedUserData) return new NextResponse("User not found", { status: 404 });
        console.log(updatedUserData);
        return new NextResponse("Investors Visibility is updated", { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Server Error", { status: 500 });
    }
}
