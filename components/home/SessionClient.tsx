"use client";


import { useSession } from "next-auth/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const SessionClient = () => {
  const { data: session } = useSession();

  if (session) {
    return <CheckIcon className="w-6 h-6 text-green-500" />;
  } else {
    return <XMarkIcon className="w-6 h-6 text-red-500" />;
  }
};
