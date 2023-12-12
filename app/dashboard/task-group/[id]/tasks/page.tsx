"use client"
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import TaskTable from "@/app/ui/task-group/tasks/table-head";
import { SelectedColumns } from "@/app/lib/definitions/task";
import { fetch_task_of_task_group } from "@/app/lib/data/task";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Page({ params }: { params: { id: string, currentPage: string } }) {
    const { data: session, status } = useSession();
    console.log({
        session,
        status
    });

    const id = params.id; // task_group_id
    const currentPage = Number(params?.currentPage) || 1;



    const selectedColumns: SelectedColumns = {
        task_id: true,
        task_group_id: true,
        user_id: true,
        owner_id: true,
        name: true,
        description: true,
        status: true,
        progress: true,
        created_at: true,
        ends_at: true,
        updated_at: true,
    };

    //const tasks = await fetch_task_of_task_group(

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
                {/*<TaskTable />*/}
            </div>
        </main>
    );
}


