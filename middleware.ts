import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/users/profile'];
const authRoutes = ['/users/login', '/users/register'];

export default function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const currentUser = request.cookies.get("currentUser")?.value;
    
    if (protectedRoutes.includes(url) && (!currentUser || Date.now() >= JSON.parse(currentUser).expiresAt)) {
        request.cookies.delete("currentUser");
        const  response = NextResponse.redirect(new URL("/login", request.url));
        return response;
    }
    if(authRoutes.includes(url) && currentUser) {
        const response = NextResponse.redirect(new URL("/", request.url));
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }