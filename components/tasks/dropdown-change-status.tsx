import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { StatusIndicator } from "@/components/ui/indicators";
import { SetTaskStatus } from "@/components/tasks/buttons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Status } from "@prisma/client";

interface Props {
    id: string;
    status: Status;
}
export default function DropdownChangeTaskStatus({ id, status }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-full flex rounded-md dark:bg-slate-800 border border-gray-700 dark:border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-500 group">
                    <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <StatusIndicator status={status} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                    {
                        Object.keys(Status).map((key) => {
                            const value = Status[key as keyof typeof Status];
                            return (
                                <DropdownMenuItem key={value}>
                                    <SetTaskStatus id={id} status={value}>
                                        <StatusIndicator status={value} />
                                    </SetTaskStatus>
                                </DropdownMenuItem>
                            );
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu >
    );
}