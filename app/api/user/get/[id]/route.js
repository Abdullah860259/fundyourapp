import user from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req,context){
    const {id} = await context.params;
    const author = await user.findById(id);
    return NextResponse.json(author);
}