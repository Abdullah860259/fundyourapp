import connectdb from "@/lib/db";
import project from "@/lib/models/project";
import { NextResponse } from "next/server";
import user from "@/lib/models/user";

export async function GET() {
    await connectdb();
    const projects = await project.find().populate("userid");
    return NextResponse.json(projects);
}