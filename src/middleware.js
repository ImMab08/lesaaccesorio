import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));  
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    '/inicio/:path*',
    '/configuracion/:path*',  
  ]
}