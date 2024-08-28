"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { set_status_of_task_group } from "@/actions/task-group";
import { set_status_of_task } from "@/actions/task";
import { Status } from "@prisma/client";

interface SetStatusProps {
  idTask?: string;
  idTaskGroup?: string;
  status: Status;
  children: React.ReactNode;
}

export function SetStatus({
  idTask,
  idTaskGroup,
  status,
  children,
}: SetStatusProps) {
  async function handleSetStatus() {
    if (idTaskGroup) {
      await set_status_of_task_group(idTaskGroup, status).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.message);
        }
      });
    } else if (idTask) {
      await set_status_of_task(idTask, status).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.message);
        }
      });
    }
  }

  if (!idTask && !idTaskGroup) {
    return null;
  }

  return (
    <Button variant="ghost" onClick={() => handleSetStatus()}>
      {children}
    </Button>
  );
}
