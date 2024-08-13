"use client";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()} size={"lg"}>
      <span className="mr-2">Sign In</span>{" "}
      <ArrowRightIcon className="w-5 md:w-6" />
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

export const LogoutButton = ({
  className = "",
  onClick = () => signOut(),
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <PowerIcon className="w-6" />
      <span>Sign out</span>
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
