import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import TaskTable from "@/app/ui/task-group/tasks/table-head";
import { auth } from "@/auth";
import { SelectedColumns } from "@/app/lib/definitions/task";
import { fetch_task_of_task_group } from "@/app/lib/data/task";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string, currentPage?: number } }) {
    const id = params.id;
    const user_id = await auth()
    console.log("🦇 ~ file: page.tsx:12 ~ Page ~ user_id:", user_id)

    const currentPage = Number(params?.currentPage) || 1;


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
                <TaskTable />
            </div>
        </main>
    );
}


