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
import { EditProject } from "./redirects";
import { RoleGate } from "../auth/role-gate";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Role } from "@prisma/client";
export default function DropdownActions({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="w-6 h-6 b-0 " />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mr-4 md:mr-10 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <DropdownMenuGroup>
            <DropdownMenuItem className="   hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
              <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]} onlyIcon={true}>
                <EditProject id={id} />
              </RoleGate>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 bg-slate-300" />
            <DropdownMenuItem className="   hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
              <ButtonDeleteProject id={id} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
