
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/auth-DEPRECATED";
/* import { notFound } from "next/navigation"; */
import { fetch_task_pages } from "@/app/lib/data/task-sql";
import { SelectedColumns } from "@/app/lib/definitions/task";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Table from "@/app/ui/task-group/tasks/table-head";
import Pagination from "@/app/ui/pagination";
import { task_group } from "@/app/lib/placeholder-data";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { page: string, query: string } }) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user?.id as string;
    const id = params.id;
    const query = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const totalPages = await fetch_task_pages(user_id, id, query);

    const selectedColumns: SelectedColumns = {
        task_id: true,
        task_group_id: false,
        user_id: false,
        owner_id: true,
        name: true,
        description: false,
        status: true,
        progress: true,
        created_at: false,
        ends_at: true,
        updated_at: false,
    };

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Task group', href: '/dashboard/task-group' },
                    {
                        label: 'Tasks',
                        href: `/dashboard/task-groups/${id}`,
                        active: true,
                    },
                ]}
            />
            <div className="mt-8">
                <Table user_id={user_id} task_group_id={id} currentPage={currentPage} selectedColumns={selectedColumns} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div>
        </main>
    );
}


