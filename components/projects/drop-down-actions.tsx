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
import { LinkEditProject } from "./redirects";
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
                            <LinkEditProject projectId={id} />
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