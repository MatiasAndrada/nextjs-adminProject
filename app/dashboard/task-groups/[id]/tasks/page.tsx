
/* import { Metadata } from "next"; */
/* import { notFound } from "next/navigation"; */
import Breadcrumbs from "@/components/breadcrumbs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { lusitana } from "@/components/fonts";
import { fetch_task_pages } from "@/data/task";
import type { Task } from "@prisma/client";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { page: string, query: string } }) {
    const id = params.id;
    const query = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const totalPages = await fetch_task_pages(id, query);

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Task Groups', href: '/dashboard/task-groups' },
                {
                    label: 'Task Group Tasks',
                    href: `/dashboard/task-groups/${id}`,
                    active: true,
                },
            ]}
            />
            <h1 className={`${lusitana.className} text-4xl`}>Task group tasks</h1>
            <div className="mt-8">
                <Table query={query} currentPage={currentPage} task_group_id={id} />
            </div>
            {totalPages > 1 &&
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            }
        </main>

    );
}


