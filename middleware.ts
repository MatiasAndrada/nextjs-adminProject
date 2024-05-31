import NextAuth from "next-auth";
import { NextResponse, NextRequest } from 'next/server'

//import type { NextRequest } from 'next/server';
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

/**
 * Middleware function for authentication and authorization.
 * @param req - The request object.
 * @returns The middleware function that handles authentication and authorization logic.
 */
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);


    if (isApiAuthRoute) {
        return /* null */;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return /* null */;
    }


    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    return /* null */;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
} 