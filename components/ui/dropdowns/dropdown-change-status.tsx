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
import { SetTaskGroupStatus } from "@/components/task-group/buttons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Status } from "@prisma/client";

interface Props {
  idTask?: string;
  idTaskGroup?: string;
  status: Status;
}
export default function DropdownChangeStatus({
  idTask,
  idTaskGroup,
  status,
}: Props) {
  const id = idTask || idTaskGroup;
  if (!id) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full flex rounded-lg dark:bg-slate-900 px-4 py-2 text-sm outline-2 placeholder:text-gray-500 group">
          <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <StatusIndicator status={status} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mr-4 md:mr-10 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          {Object.keys(Status).map((key) => {
            const value = Status[key as keyof typeof Status];
            return (
              <DropdownMenuItem key={value}>
                {idTaskGroup ? (
                  <SetTaskGroupStatus id={id} status={value}>
                    <StatusIndicator status={value} />
                  </SetTaskGroupStatus>
                ) : (
                  <SetTaskStatus id={id} status={value}>
                    <StatusIndicator status={value} />
                  </SetTaskStatus>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
