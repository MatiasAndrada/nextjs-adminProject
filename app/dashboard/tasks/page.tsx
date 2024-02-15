import { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetch_all_tasks_of_project } from "@/data/task";
import Table from "@/components/tasks/table-head";
import { lusitana } from "@/components/fonts";
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
            <div className="flex flex-col gap-8 w-full items-start justify-between mt-4 ml-4">
                <Breadcrumbs breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Tasks', href: '/dashboard/tasks', active: true },
                ]} />
            </div>
            <div className="ml-4">
                <h1 className={`${lusitana.className} text-4xl mb-4`}>Tasks groups</h1>
                <h2 className="text-xl font-bold">All task of project</h2>
            </div>
            <div className="mt-4 ">
                <div>

                    <Table tasks={tasks} />
                    {/*
                    <Pagination total={total} />
            */}
                </div>
            </div>
        </div>
    );
}