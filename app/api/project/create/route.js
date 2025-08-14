import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Project from "@/lib/models/project";

export async function POST(req) {
  await connectdb();
  const data = await req.json();
  const { title, description, goal, image, tags } = data;
  const project = await Project.findOne({ title });
  if (project) {
    return NextResponse.json({
      status: 400,
      message: "Project already exists",
    });
  }
  const newProject = new Project({
    title,
    userid: data.userid,
    description,
    goal,
    image,
    tags,
    investors:[],
  });
  await newProject.save();
  return NextResponse.json({
    status: 200,
    message: "Project created successfully",
  });
}
