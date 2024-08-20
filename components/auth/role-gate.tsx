"use client";
import { useState } from "react";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  onlyIcon?: boolean;
  message?: string;
}

export const RoleGate = ({
  children,
  allowedRoles,
  onlyIcon,
  message,
}: RoleGateProps) => {
  const [hasClicked, setHasClicked] = useState(false);
  const { data: session } = useSession();
  const current_project_role = session?.user.currentProject?.role;
  if (!current_project_role) return null;

  const hasAccess = allowedRoles.includes(current_project_role);

  const handleClick = () => {
    if (session && current_project_role && !hasAccess) {
      setHasClicked(true);
    }
  };

  if (session && !hasAccess && hasClicked) {
    if (!message && !onlyIcon)
      message = "You do not have permission to perform this action.";
    return <FormError message={message} />;
  }

  return (
    <div onClick={handleClick}>
      <div
        style={
          hasAccess
            ? { pointerEvents: "all" }
            : { pointerEvents: "none", opacity: 0.7 }
        }
      >
        {children}
      </div>
    </div>
  );
};
