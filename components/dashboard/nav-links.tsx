"use client";

import Link from "next/link";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  ChartBarSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Asegúrate de importar la función `cn` correctamente

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
interface Link {
  name: string;
  href: string;
  icon: any;
  state?: "disabled";
}

const links: Link[] = [
  { name: "Projects", href: "/projects", icon: HomeIcon },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartBarSquareIcon,
  },
  {
    name: "Task group",
    href: "/dashboard/task-groups",
    icon: FolderIcon,
  },
  {
    name: "Task",
    href: "/dashboard/tasks",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Members",
    href: "/dashboard/members",
    icon: UserGroupIcon,
  },
  {
    name: "Recycle Bin",
    href: "/dashboard/recycle-bin",
    icon: TrashIcon,
    state: "disabled",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            className=""
            href={link.state === "disabled" ? "#" : link.href}
          >
            <Button
              className={cn(
                pathname === link.href && "bg-sky-200 text-blue-600"
              )}
              variant={"sidenav"}
            >
              <LinkIcon
                className={`w-6 
            ${link.state ? "opacity-40" : ""}
            `}
              />
              <p
                className={`hidden md:block ${
                  link.state ? "line-through opacity-40" : ""
                }`}
              >
                {link.name}
              </p>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
