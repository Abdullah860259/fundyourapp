import connectdb from "@/lib/db";
import Project from "@/lib/models/project";
import { NextResponse } from "next/server";

export async function GET(req,context){
    const {id} = await context.params;
    await connectdb();
    const project = await Project.findById(id).populate("userid")
    return NextResponse.json(project)
}