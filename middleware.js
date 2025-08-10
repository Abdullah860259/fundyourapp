import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/projects", "/settings"];

  // If trying to access protected route without a valid session → go home
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/?isLogged=false", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/projects",
    "/settings", // add all pages you want to protect
  ],
};
