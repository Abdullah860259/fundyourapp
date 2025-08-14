import connectdb from "@/lib/db";
import project from "@/lib/models/project";
import { NextResponse } from "next/server";

export async function GET(req){
    const url = new URL(req.url);
    const id = url.searchParams.get("id")
    await connectdb();
    const proj = await project.findById(id);
    return new NextResponse(JSON.stringify(proj.investors))
}