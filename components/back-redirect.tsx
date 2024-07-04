"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BackRedirect() {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      onClick={() => router.back()}
      className="font-normal w-full"
    >
      Go back
    </Button>
  );
}