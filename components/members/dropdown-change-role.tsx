import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { RoleIndicator } from "@/components/indicators";
import { SetRoleOfMember } from "@/components/members/buttons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Role } from "@prisma/client";

interface Props {
    user_id: string;
    project_id: string;
    role: Role;
}


export default function DropdownChangeRole({ user_id, project_id, role }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-full flex rounded-md dark:bg-slate-800 border border-gray-700 dark:border-gray-300 px-4 py-2 text-sm outline-2 placeholder:text-gray-500 group">
                    <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <RoleIndicator role={role}>
                        {role}
                    </RoleIndicator>
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                    {
                        Object.keys(Role).map((key) => {
                            const value = Role[key as keyof typeof Role];
                            if (value === Role.OWNER) return null;
                            return (
                                <DropdownMenuItem key={value}>
                                    <SetRoleOfMember redirect={"/dashboard/members"} user_id={user_id} project_id={project_id} role={value}>
                                        <RoleIndicator role={value}>
                                            {value}
                                        </RoleIndicator>
                                    </SetRoleOfMember>
                                </DropdownMenuItem>
                            );
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu >
    );
}