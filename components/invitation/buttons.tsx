"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { accept_invitation, decline_invitation } from "@/actions/invitations";
import { toast } from "sonner";

export function AcceptInvite({
  token,
  redirect,
}: {
  token: string;
  redirect?: string;
}) {
  const router = useRouter();
  const handleAccept = async () => {
    await accept_invitation(token)
      .then((res) => {
        if (redirect && res.success) {
          router.push(redirect);
        }
        if (res.error) {
          toast.error(res.error);
        }
        if (res.success) {
          toast.success(res.success);
        }
        router.refresh();
      })
      .catch((error) => {
        toast.error("An unexpected error occurred.");
        console.error(error);
      });
  };
  return <Button onClick={() => handleAccept()}>Accept</Button>;
}

export function DeclineInvite({
  token,
  children,
  redirect,
}: {
  token: string;
  children?: React.ReactNode;
  redirect?: string;
}) {
  const router = useRouter();
  const handleDecline = async () => {
    await decline_invitation(token)
      .then((res) => {
        if (redirect && res.success) {
          router.push(redirect);
        }
        if (res.error) {
          toast.error(res.error);
        }
        if (res.success) {
          toast.success(res.success);
        }
        router.refresh();
      })
      .catch((error) => {
        toast.error("An unexpected error occurred.");
        console.error(error);
      });
  };
  return (
    <Button onClick={() => handleDecline()} variant="destructive">
      {children ? children : "Decline"}
    </Button>
  );
}
