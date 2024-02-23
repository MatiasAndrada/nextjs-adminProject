import { Suspense } from "react";
import { Metadata } from 'next';
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import TaskGroupGrid from '@/components/task-group/task-group-grid';
import Pagination from "@/components/pagination";
import { CreateTaskGroup } from "@/components/task-group/buttons";
import { fetch_task_group_pages } from "@/data/task-group";
//!ADD SKELETON LOADING
import { lusitana } from "@/components/fonts";

export const metadata: Metadata = {
    title: 'Tasks group',
};

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    /*     const project_id = localStorage.getItem("SELECTED_PROJECT") */
    const totalPages = await fetch_task_group_pages(query)
    return (
        <div className="w-full">
            <div className="flex flex-col gap-8 w-full items-start justify-between">
                <Breadcrumbs breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Task Groups', href: '/dashboard/task-groups', active: true },
                ]} />
            </div>
            <h1 className={`${lusitana.className} text-4xl`}>Tasks groups</h1>
            <div>
                <div className="mt-4 flex items-center justify-between gap-2 mx-6">
                    <Search placeholder="Search task groups..." />
                    <CreateTaskGroup />
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <TaskGroupGrid query={query} currentPage={currentPage} />
                </Suspense>
                <div className="flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
