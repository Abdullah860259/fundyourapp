import emailExistence from "email-existence";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    return new Promise((resolve) => {
        try {
            emailExistence.check(email, (err, exists) => {
                if (err) {
                    console.error(err);
                    resolve(NextResponse.json({ message: `${err.message}` }, { status: 500 }))
                } else {
                    resolve(NextResponse.json({ message: `${exists}` }, { status: 200 }))
                }
            })
        } catch (error) {
            console.error(error);
            resolve(NextResponse.json({ message: `Error: ${err.message}` }, { status: 500 }));
        }
    })
}