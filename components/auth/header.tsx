import { lusitana } from "@/components/fonts";

import { cn } from "@/lib/utils";


interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold",
        lusitana.className,
      )}>
        🔐 Project Admin
      </h1>
      <p className="text-muted-foreground text-md">
        {label}
      </p>
    </div>
  );
};
