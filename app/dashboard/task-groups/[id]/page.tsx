
/* import { Metadata } from "next"; */
/* import { notFound } from "next/navigation"; */
import Breadcrumbs from "@/components/breadcrumbs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { fetch_task_pages } from "@/data/task";

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
                    label: 'Tasks of Task Group',
                    href: `/dashboard/task-groups/${id}`,
                    active: true,
                },
            ]}
            />
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


