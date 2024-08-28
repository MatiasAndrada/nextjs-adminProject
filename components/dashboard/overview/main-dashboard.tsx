import Table from "./table";
import Filter from "./filter";
import Pagination from "@/components/pagination";
import { CreateTaskGroup } from "@/components/task-group/redirects";
import { UpdateProject } from "@/components/dashboard/redirects";
import { RoleGate } from "@/components/auth/role-gate";
import {
  fetch_filtered_task_group,
  fetch_task_group_pages,
} from "@/data/task-group";
import { Role } from "@prisma/client";

export default async function MainDashboard({
  id,
  name,
  description,
  searchParams,
}: {
  id: string;
  name: string;
  description: string | null;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const taskGroup = await fetch_filtered_task_group(query, currentPage);
  const totalPages = await fetch_task_group_pages(query);
  return (
    <section className="h-fit col-span-2 p-2 my-2 rounded-lg bg-slate-300 dark:bg-gray-800 dark:text-gray-100 ">
      <div className="ml-2">
        <span className="ml-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
          Name:
        </span>
        <div className="flex flex-row justify-start items-center gap-4">
          <h3 className="py-2 text-2xl font-bold ">{name}</h3>
          <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]}>
            <UpdateProject id={id} />
          </RoleGate>
        </div>
        <p className="ml-4 mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
          Description:
        </p>
        <p className="text-md font-medium max-h-64 overflow-y-auto text-slate">
          {description || "No description"}
        </p>
      </div>
      <div className="mt-2">
        <div className="container p-2 mx-auto dark:dark:text-gray-100">
          {taskGroup.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center gap-4 ">
              <h2 className="text-lg  text-gray-400">
                There are no task groups
              </h2>
              <CreateTaskGroup />
            </div>
          ) : (
            <>
              <div className="flex flex-row justify-between">
                <h2 className="mb-4 text-2xl font-semibold leadi">
                  Task group status
                </h2>
                <Filter />
              </div>
              <div className="overflow-x-auto">
                <Table
                  query={query}
                  currentPage={currentPage}
                  taskGroup={taskGroup}
                />
              </div>
              <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
