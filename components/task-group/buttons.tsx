"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
/* import {
  TooltipProvider,
  Root as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  } from "@radix-ui/react-tooltip"; */
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  delete_task_group,
  set_status_of_task_group,
} from "@/actions/task-group";
import { Status } from "@prisma/client";

export function DeleteTaskGroup({ id }: { id: string }) {
  return (
    <Button onClick={() => delete_task_group(id)} variant="destructive">
      <TrashIcon className="w-7 hover:scale-110 text-slate-300 hover:text-white transition duration-300 ease-in-out transform" />
    </Button>
  );
}

export function SetTaskGroupStatus({
  id,
  status,
  children,
}: {
  id: string;
  status: Status;
  children: React.ReactNode;
}) {
  async function handleSetTaskGroupStatus() {
    await set_status_of_task_group(id, status).then((res) => {
      toast.success(res.message);
    });
  }
  return (
    <Button variant="ghost" onClick={() => handleSetTaskGroupStatus()}>
      {children}
    </Button>
  );
}
