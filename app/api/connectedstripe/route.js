import connectdb from "@/lib/db";
import user from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    await connectdb();
    const users = await user.findById(id)
    const response = users.connectedAccountId ? true : false ;
    return NextResponse.json(response);
}