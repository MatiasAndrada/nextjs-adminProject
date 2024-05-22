"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  ChartBarSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
            href={link.state === "disabled" ? "#" : link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 dark:bg-slate-800  p-3 text-sm font-medium  hover:bg-sky-200 dark:hover:bg-sky-950 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "bg-sky-200  text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon
              className={`w-6 
            ${link.state ? "opacity-40" : ""}
            `}
            />
            <p
              className={`hidden md:block ${link.state ? "line-through opacity-40" : ""
                }`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
