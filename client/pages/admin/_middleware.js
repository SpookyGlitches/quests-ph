import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) return NextResponse.redirect("/landing"); // not logged in user
  if (session.user.role !== "admin") return NextResponse.redirect("/"); // if logged in member/mentor tries to access admin page
  return NextResponse.next();
}
