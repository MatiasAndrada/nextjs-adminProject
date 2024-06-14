import NextAuth from "next-auth";
import { NextResponse, NextRequest } from 'next/server'

//import type { NextRequest } from 'next/server';
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    roleRoutesPermissions
} from "@/routes";
import { currentRole } from "./hooks/use-current-role"
import { Role } from "@prisma/client";

const { auth } = NextAuth(authConfig);
/**
 * Middleware function for authentication and authorization.
 * @param req - The request object.
 * @returns The middleware function that handles authentication and authorization logic.
 */
export default auth(async (req) => {
    /*     const token = req.nextauth.token;
        console.log("🦇  auth  token:", token) */
    const { nextUrl } = req;
    const pathname = nextUrl.pathname
    /*     console.log(req.auth) */
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);


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

    // Find a matching path with dynamic path handling
    const matchingRoleRoute = roleRoutesPermissions.find((p) => {
        if (p.path.includes("[id]")) {
            // Replace '[id]' with a regex pattern and test the pathname
            const regex = new RegExp(`^${p.path.replace("[id]", "\\w+")}$`);
            return regex.test(pathname);
        }
        return p.path === pathname;
    });
    console.log("🦇  matchingRoleRoute  matchingRoleRoute:", matchingRoleRoute)
    const currenRole = await currentRole()
    if (matchingRoleRoute?.permissions.some(permission => currenRole?.includes(permission))) {
        console.log("access-denied")
        return NextResponse.redirect(new URL("/access-denied", nextUrl));
    }

    /*     const currentRol =  */


    return /* null */;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
} 
