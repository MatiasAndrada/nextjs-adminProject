"use client";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

export const LoginButton = () => {
    return (
        <Button onClick={() => signIn()} size={"lg"}>
            <span className="mr-2">Sign In</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Button>
    );
};

export const RegisterButton = () => {
    return (
        <Link href="/register" style={{ marginRight: 10 }}>
            Register
        </Link>
    );
};

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 dark:bg-slate-900 p-3 text-sm font-medium hover:bg-sky-200 dark:hover:bg-sky-950 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" onClick={() => signOut()}>
            {children}
            <span className="mr-2 text-md capitalize text-bold">Sign Out</span>
        </button>
    );
};

export const ProfileButton = () => {
    return <Link href="/profile">Profile</Link>;
};
