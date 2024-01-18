import { Suspense } from "react";
import { Metadata } from 'next';
import { auth } from '@/auth';
import { fetch_task_group_pages } from '@/data/task-group';
import TaskGroupGrid from '@/components/task-group/task-group-grid';
import Search from "@/components/search";
import { CreateTaskGroup } from "@/components/task-group/buttons";
import Pagination from "@/components/pagination";
//!ADD SKELETON LOADING
import { lusitana } from "@/components/fonts";


export const metadata: Metadata = {
    title: 'Tasks group',
};

export default async function Page({ searchParams, }: { searchParams?: { query?: string; page?: string; }; }) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    /*     const project_id = localStorage.getItem("SELECTED_PROJECT") */
    /*     const totalPages = await fetch_task_group_pages(query) */

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Task group</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search task groups..." />
                <CreateTaskGroup />s
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {/*                 <TaskGroupGrid user_id={user_id} query={query} currentPage={currentPage} /> */}
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {/*    <Pagination totalPages={totalPages} /> */}
            </div>
        </div>
    );
}
