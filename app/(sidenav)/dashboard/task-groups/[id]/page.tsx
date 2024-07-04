
/* import { Metadata } from "next"; */
/* import { notFound } from "next/navigation"; */
import * as Tabs from '@radix-ui/react-tabs';
import Breadcrumbs from "@/components/breadcrumbs";
import TaskGroupDetails from "@/components/task-group/task-group-details";
import TabsTaskGroupDetail from '@/components/task-group/tabs';
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { fetch_task_pages } from "@/data/task";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { page: string, query: string } }) {
    const id = params.id;


    return (
        <main className="space-y-4">
            <Breadcrumbs breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Task Groups', href: '/dashboard/task-groups' },
                {
                    label: 'Task Group',
                    href: `/dashboard/task-groups/${id}`,
                    active: true,
                },
            ]}
            />
            <TaskGroupDetails id={id} />
            <TabsTaskGroupDetail id={id} searchParams={searchParams} />
            {/* 
            <Table query={query} currentPage={currentPage} task_group_id={id} />
            {totalPages > 0 &&
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            }


 */}

        </main>

    );
}


