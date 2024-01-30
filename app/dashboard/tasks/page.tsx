import { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetch_all_tasks_of_project } from "@/data/task";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { fetch_task_pages } from "@/data/task";
import type { Task } from "@prisma/client";

export const metadata: Metadata = {
    title: 'Tasks | Dashboard',
};

export default async function Page() {
    const tasks = await fetch_all_tasks_of_project();


    return (
        <div className="w-full">
            <div className="flex flex-col gap-8 w-full items-center justify-between">
                <h1 className='text-2xl'>Tasks</h1>
                <div className="ml-8">

                    <Breadcrumbs breadcrumbs={[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Tasks', href: '/dashboard/tasks', active: true },
                    ]} />
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div>
                    <h2 className="text-xl font-bold">All task of project</h2>

                    <Table tasks={tasks} />
                    {/*
                    <Pagination total={total} />
            */}
                </div>
            </div>
        </div>
    );
}