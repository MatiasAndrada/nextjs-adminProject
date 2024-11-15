import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { StatusIndicator } from "@/components/ui/indicators";
import { SetStatus } from "@/components/ui/buttons/change-status";
import { useProjectRoleHasAccess } from "@/hooks/use-current-role";
import { Status, Role } from "@prisma/client";

interface Props {
  idTask?: string;
  idTaskGroup?: string;
  status: Status;
  rolesAllowed: Role[];
}

export default async function DropdownChangeStatus({
  idTask,
  idTaskGroup,
  status,
  rolesAllowed,
}: Props) {
  const id = idTask || idTaskGroup;
  if (!id) return null;
  const has_access = await useProjectRoleHasAccess(rolesAllowed);

  if (has_access) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-full flex rounded-lg bg-slate-400 dark:bg-slate-800 px-4 py-3 text-sm outline-2 placeholder:text-gray-500">
            <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-2" />
            <StatusIndicator status={status} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="mr-4 md:mr-10 border-slate-300 dark:border-slate-800 bg-slate-400 dark:bg-slate-900">
            {Object.keys(Status).map((key) => {
              const value = Status[key as keyof typeof Status];
              return (
                <DropdownMenuItem key={value}>
                  <SetStatus
                    idTask={idTask}
                    idTaskGroup={idTaskGroup}
                    status={value}
                  >
                    <StatusIndicator status={value} />
                  </SetStatus>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  }

  return <StatusIndicator status={status} />;
}
