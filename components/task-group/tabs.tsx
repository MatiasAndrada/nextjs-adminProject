import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
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
    <TabsRoot defaultValue="tab1">
      <TabsList ariaLabel="Manage your account">
        <TabsTrigger value="tab1">Tasks</TabsTrigger>
        <TabsTrigger value="tab2">Members Assigned</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div>
          <Table query={query} currentPage={currentPage} task_group_id={id} />
          {totalPages > 0 && (
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div>
          <MembersAssignForTaskGroup
            id={id}
            searchParams={{
              page: currentPage,
            }}
          />
        </div>
      </TabsContent>
    </TabsRoot>
  );
}
