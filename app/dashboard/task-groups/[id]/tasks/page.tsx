
/* import { Metadata } from "next"; */
/* import { notFound } from "next/navigation"; */
import Breadcrumbs from "@/components/breadcrumbs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { fetch_task_pages } from "@/data/task";
import { fetch_task_of_task_group_for_table } from "@/data/task";
import { SelectedColumns } from "@/definitions/task";
import type { Task } from "@prisma/client";


export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { page: string, query: string } }) {
    const id = params.id;
    const query = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const tasks = await fetch_task_of_task_group_for_table(id, currentPage)
    const totalPages = await fetch_task_pages(id, query);

    const selectedColumns: Partial<Task> = {
        id: "",
        name: "",
        status: "",
        progress: 0,
        updatedAt: new Date(),
    };


    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Task Groups', href: '/dashboard/task-groups' },
                {
                    label: 'Tasks of Task Group',
                    href: `/dashboard/task-groups/${id}`,
                    active: true,
                },
            ]}
            />
            <div className="mt-8">
                <Table tasks={tasks} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div>
        </main>
    );
}


