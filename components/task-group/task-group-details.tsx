import { RoleGate } from "@/components/auth/role-gate";
import DropdownChangeStatus from "@/components/ui/dropdowns/dropdown-change-status";
import DropdownChangeCriticality from "@/components/task-group/dropdown-change-criticality";
import { ProgressIndicator } from "@/components/ui/indicators";
import { EditTaskGroup } from "@/components/task-group/redirects";
import { DeleteTaskGroup } from "@/components/task-group/buttons";
import { UsersIcon } from "@heroicons/react/24/outline";
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
        <div className="flex w-full justify-between items-center gap-4">
          <h2 className="text-slate-800 dark:text-slate-200 text-3xl font-semibold">
            {name}
          </h2>
          <RoleGate
            allowedRoles={[Role.OWNER, Role.ADMIN]}
            message="You don't have permissions"
          >
            <div className="flex flex-row items-center  md:mr-10 gap-12">
              <DeleteTaskGroup id={id} />
              <EditTaskGroup id={id} />
            </div>
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
          <DropdownChangeCriticality id={id} criticality={criticality} />
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
          <DropdownChangeStatus idTaskGroup={id} status={status} />
        </div>
      </div>
    </div>
  );
};
export default TaskGroupDetails;
