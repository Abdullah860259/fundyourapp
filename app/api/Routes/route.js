"use server"
import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import User from "@/lib/models/user";

export async function POST(req) {
  await connectdb();
  const data = await req.json();
  const { email, name, image } = data;

  let user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      name,
      email,
      ImageLink: image,
      createdAt: new Date(),
      settings: { showInvestors: true },
    });
    user = await newUser.save(); // save and assign to `user`
  }

  return NextResponse.json({
    id: user._id, // ✅ send this back to jwt()
    name: user.name,
    email: user.email,
    image: user.ImageLink,
    createdAt: user.createdAt,
  });
}
