"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";

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

interface LogoutButtonProps extends ButtonProps {
  className?: string;
  variant?: ButtonProps["variant"];
  onClick?: () => void;
}
export const LogoutButton = ({
  className = "",
  variant,
  onClick = () => signOut(),
}: LogoutButtonProps) => {
  return (
    <Button
      className={`flex items-center gap-2 ${className}`}
      variant={variant} // Se pasa la variante aquí
      onClick={onClick}
    >
      <PowerIcon className="w-6" />
      <span>Sign out</span>
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
