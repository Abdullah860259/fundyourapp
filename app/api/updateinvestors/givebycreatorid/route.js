import connectdb from "@/lib/db";
import user from "@/lib/models/user";
import project from "@/lib/models/project";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {

        await connectdb();
        const url = new URL(req.url)
        const id = url.searchParams.get("id")
        const Project = await project.findById(id);
        const creatorid = Project.userid.toString()
        const creator = await user.findById(creatorid)
        const showInvestors = creator.settings.showInvestors;
        return new NextResponse(showInvestors, { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}