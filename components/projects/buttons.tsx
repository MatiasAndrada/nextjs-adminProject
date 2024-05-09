import Link from "next/link";
//components
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "../../components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
//icons

import {
    EyeIcon,
    EllipsisVerticalIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

export function ButtonCreate() {
    return (
        <Link href="/projects/create">
            <Button variant="create">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                Create a new project
            </Button>
        </Link>
    );
}

export function ButtonViewProject({ projectId }: { projectId: string }) {
    return (
        <Link href={`/projects/${projectId}`}>
            <Button variant="outline" size="sm">
                <EyeIcon className="w-6 h-6 mr-0.5" />
                View project
            </Button>
        </Link>
    );
}

export function ButtonActionsDropDropdown() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-6 h-6 b-0 " />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:bg-slate-200">
                            <Link href={"/profile"} className="flex gap-1">
                                <PencilIcon className="w-4 h-4" />
                                <p>Update</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-slate-300" />
                        <DropdownMenuItem className="hover:bg-red-200 text-red-500">
                            <TrashIcon className="w-4 h-4 mr-1" />
                            <p>
                                Delete
                            </p>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}
