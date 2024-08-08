import {
  UserIcon,
  UserGroupIcon,
  DocumentIcon,
  RectangleStackIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { RoleIndicator } from "@/components/ui/indicators";
import { currentRole } from "@/hooks/use-current-role";
import {
  fetch_count_in_progress_task_group,
  fetch_count_total_task_group,
} from "@/data/task-group";
import {
  fetch_count_in_progress_task,
  fetch_count_total_tasks_of_project,
} from "@/data/task";
import { fetch_count_members } from "@/data/projects";
export default async function HeaderDashboard({ id }: { id: string }) {
  const [
    role,
    countTaskGroupInProgress,
    countTaskGroupTotal,
    countTaskTotal,
    members,
  ] = await Promise.all([
    currentRole(),
    fetch_count_in_progress_task_group(id),
    fetch_count_total_task_group(id),
    fetch_count_total_tasks_of_project(id),
    fetch_count_members(id),
  ]);
  return (
    <section className="col-span-3 row-span-1">
      <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
          <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-blue-500">
            <UserIcon className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            {role ? (
              <RoleIndicator role={role} className="text-2xl  px-0 py-0">
                {role}
              </RoleIndicator>
            ) : null}
            <p className="">Is your role</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
          <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-blue-500">
            <DocumentCheckIcon className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leadi">2</p>
            <p className="">Task groups assigned</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
          <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-blue-500">
            <UserGroupIcon className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leadi">{members}</p>
            <p className="">Members</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
          <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-blue-500">
            <RectangleStackIcon className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leadi">
              {countTaskGroupInProgress} of {countTaskGroupTotal}
            </p>
            <p className="">Completed task group</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
          <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-blue-500">
            <DocumentIcon className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leadi">
              {/* {countTaskInProgress} of */} {countTaskTotal}
            </p>
            <p className="">Total task</p>
          </div>
        </div>
      </div>
    </section>
  );
}
