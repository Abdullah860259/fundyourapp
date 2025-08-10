import Project from "@/lib/models/project";
import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
export async function GET(request, context) {
  await connectdb();
  const {id} = await context.params
  const project = await Project.findById(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
export async function POST(request, context) {
  const {id} = await context.params
  await connectdb();
  const project = await Project.findById(id);
  const data = await request.json();
  const updatedOne = {
    title:data.title,
    description:data.description,
    image:data.image,
    tags:data.tags
  }
  const updatedProject = await Project.findByIdAndUpdate(id,{...updatedOne},{new:true})
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(updatedProject);
}
export async function DELETE(request, { params }) {
  await connectdb();
  const { id } = await params;

  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Project deleted successfully" });
}