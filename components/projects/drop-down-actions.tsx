import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ButtonDeleteProject } from "./buttons";
import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";


export default function ButtonActionsDropDropdown({ id }: { id: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-6 h-6 b-0 " />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:bg-slate-200">
                            <a href={`/projects/${id}/edit`} className="flex gap-1">
                                <PencilIcon className="w-4 h-4" />
                                <p>Update</p>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-slate-300" />
                        <DropdownMenuItem className="text-red-500">
                            <ButtonDeleteProject id={id} />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu >
    );
}