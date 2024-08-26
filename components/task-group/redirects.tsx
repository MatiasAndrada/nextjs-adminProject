import Link from "next/link";
import { Button } from "../ui/button";
import {
  TooltipProvider,
  Root as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

export function ViewTasks({ id }: { id: string }) {
  return (
    <Link
      href={`task-groups/` + id}
      className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 border-2 border-black  hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
    >
      <span>View Tasks</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h13M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function CreateTaskGroup() {
  return (
    <Link href="/dashboard/task-groups/create">
      <Button>
        <PlusIcon className="mr-2 h-5 text-4xl font-bold" />
        <span> Create Task Group </span>
      </Button>
    </Link>
  );
}

export function EditTaskGroup({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/task-groups/${id}/edit`}>
      <Button>
        <PencilIcon className="w-7 hover:scale-110 text-slate-300 hover:text-white transition duration-300 ease-in-out transform" />
      </Button>
    </Link>
  );
}
