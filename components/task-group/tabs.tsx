import * as Tabs from "@radix-ui/react-tabs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import MembersAssignForTaskGroup from "../members/members-assign-for-task-group";
import { fetch_task_pages } from "@/data/task";

export default async function TaskGroupDetailTabs({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { page: number; query: string };
}) {
  const currentPage = searchParams.page || 1;
  const query = searchParams.query || "";
  const totalPages = await fetch_task_pages(query, id);
  return (
    <Tabs.Root
      className="flex flex-col bg-darkModeBg text-black dark:text-white "
      defaultValue="tab1"
    >
      <Tabs.List
        className="shrink-0 flex  border-gray-500"
        aria-label="Manage your account"
      >
        {/**border bottom disable with active */}
        <Tabs.Trigger
          className="px-5 h-12 flex-1 flex items-center justify-center text-lg leading-none select-none first:rounded-tl-md last:rounded-tr-md  normal-case data-[state=active]:text-blue-500 bg-slate-300/50 data-[state=active]:bg-slate-300 dark:bg-slate-900/50 dark:data-[state=active]:bg-slate-900 data-[state=active]:border-b-2 border-slate-500"
          value="tab1"
        >
          Tasks
        </Tabs.Trigger>
        <Tabs.Trigger
          className="px-5 h-12 flex-1 flex items-center justify-center text-lg leading-none select-none first:rounded-tl-md last:rounded-tr-md  normal-case data-[state=active]:text-blue-500 bg-slate-300/50 data-[state=active]:bg-slate-300 dark:bg-slate-900/50 bg-slate-900 data-[state=active]:border-b-2 border-slate-500"
          value="tab2"
        >
          Members Assigned
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="grow " value="tab1">
        <div className="mt-2">
          <Table query={query} currentPage={currentPage} task_group_id={id} />
          {totalPages > 0 && (
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content className="grow " value="tab2">
        <div className="mt-2">
          <MembersAssignForTaskGroup
            id={id}
            searchParams={{
              page: currentPage,
            }}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
