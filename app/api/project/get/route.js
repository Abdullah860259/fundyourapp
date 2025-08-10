import Project from "@/lib/models/project";
import connectdb from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  const {searchParams} = new URL(req.url)
  const id = searchParams.get("id")
  await connectdb();
  const projects = await Project.find({userid:id});
  return NextResponse.json(projects);
}
