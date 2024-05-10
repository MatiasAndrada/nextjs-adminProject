"use client"
//components
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "../ui/dropdown-menu";
import {
    EllipsisVerticalIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
//functions
import { delete_project_by_id } from "@/actions/projects";

export default function ButtonActionsDropDropdown({ id }: { id: string }) {

    async function handleDelete(id: string) {
        console.log("🦇  handleDelete  id:", id)
        await delete_project_by_id(id);
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-6 h-6 b-0 " />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:bg-slate-200">
                            {/*     <Link href={`/projects/`} className="flex gap-1"> */}
                            <PencilIcon className="w-4 h-4" />
                            <p>Update</p>
                            {/*     </Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-slate-300" />
                        <DropdownMenuItem className="text-red-500" onSelect={() => handleDelete(id)}>
                            <TrashIcon className="w-4 h-4 mr-1" />
                            <p>Delete</p>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}