import { Suspense } from "react";
import { Metadata } from 'next';


import TaskGroupGrid from '@/components/task-group/task-group-grid';
import Search from "@/components/search";
import { CreateTaskGroup } from "@/components/task-group/buttons";
/* import Pagination from "@/components/pagination"; */
//!ADD SKELETON LOADING
import { lusitana } from "@/components/fonts";
import { currentSelectedProject } from "@/hooks/use-current-project";


export const metadata: Metadata = {
    title: 'Tasks group',
};

export default async function Page({ searchParams, }: { searchParams?: { query?: string; page?: string; }; }) {
    const currentProject = await currentSelectedProject();

    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    /*     const project_id = localStorage.getItem("SELECTED_PROJECT") */
    /*     const totalPages = await fetch_task_group_pages(query) */

    return (
        <div className="w-full">
            <h1 className={`${lusitana.className} text-4xl mt-4 ml-4`}>Tasks groups</h1>
            <div>
                <div className="mt-4 flex items-center justify-between gap-2 mx-6">
                    <Search placeholder="Search task groups..." />
                    <CreateTaskGroup />
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <TaskGroupGrid query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination totalPages={totalPages} /> */}
                </div>
            </div>
        </div>
    );
}
