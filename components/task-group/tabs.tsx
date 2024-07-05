import * as Tabs from "@radix-ui/react-tabs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import MembersAssignForTaskGroup from "../members/members-assign-for-task-group";
import { fetch_task_pages } from "@/data/task";

export default async function TabsTaskGroupDetail({
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
            className="flex flex-col bg-darkModeBg text-white"
            defaultValue="tab1"
        >
            <Tabs.List
                className="shrink-0 flex border-b border-gray-500"
                aria-label="Manage your account"
            >
                <Tabs.Trigger
                    className="px-5 h-12 flex-1 flex items-center justify-center text-lg leading-none text-white select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue-500"
                    value="tab1"
                >
                    Tasks
                </Tabs.Trigger>
                <Tabs.Trigger
                    className="px-5 h-12 flex-1 flex items-center justify-center text-lg leading-none text-white select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue-500"
                    value="tab2"
                >
                    Members Assigned
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
                className="grow p-5 rounded-b-md outline-none focus:shadow-outline"
                value="tab1"
            >
                <h3 className="mb-5 text-white text-lg leading-normal">
                    Tasks assigned to this group
                </h3>
                <Table query={query} currentPage={currentPage} task_group_id={id} />
                {totalPages > 0 && (
                    <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div>
                )}
            </Tabs.Content>
            <Tabs.Content
                className="grow p-5 rounded-b-md outline-none focus:shadow-outline"
                value="tab2"
            >
                <h3 className="mb-5 text-white text-lg leading-normal">
                    Members assigned to this task group
                </h3>
                <div className="space-y-4">
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
