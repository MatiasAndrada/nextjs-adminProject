import Link from "next/link";
import { PencilSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import { RoleGate } from "../auth/role-gate";
import {
  CriticalityIndicator,
  StatusIndicator,
  ProgressIndicator,
} from "@/components/ui/indicators";
import {
  fetch_task_group_by_id,
  fetch_task_group_progress_by_id,
} from "@/data/task-group";
import { fetch_members_assigned_to_task_group } from "@/data/members";

import { Role } from "@prisma/client";

const TaskGroupDetails = async ({ id }: { id: string }) => {
  const taskGroup = await fetch_task_group_by_id(id);
  if (!taskGroup) return null;
  const { name, description, criticality, status } = taskGroup;
  const { task_count, task_completed } =
    await fetch_task_group_progress_by_id(id);
  const membersAssigned = await fetch_members_assigned_to_task_group(id);
  const membersAssignedCount = membersAssigned?.length;
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:space-x-4">
      <div className="w-full lg:w-3/5 space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-800 dark:text-slate-200 text-3xl font-semibold">
            {name}
          </h2>
          <RoleGate
            allowedRoles={[Role.OWNER, Role.ADMIN]}
            message="You don't have permissions"
          >
            <Link
              href={`/dashboard/task-groups/${id}/edit`}
              className="transition transform hover:-translate-y-1 hover:scale-110"
            >
              <PencilSquareIcon className="w-8 h-8 hover:text-black dark:hover:text-white" />
            </Link>
          </RoleGate>
        </div>
        <p className="text-md text-slate-800 dark:text-slate-300">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full lg:w-2/5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-md">Task progress:</span>
          <div className="flex items-center gap-1">
            <ProgressIndicator
              fraction={{ numerator: task_completed, denominator: task_count }}
            />
            <span>
              {task_completed}/{task_count}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-md">Criticality:</span>
          <CriticalityIndicator criticality={criticality}>
            {criticality}
          </CriticalityIndicator>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-md">Total members:</span>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-6 h-6" />
            <span>{membersAssignedCount}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-md">Status:</span>
          <StatusIndicator status={status} />
        </div>
      </div>
    </div>
  );
};
export default TaskGroupDetails;
