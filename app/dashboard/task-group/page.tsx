import { Suspense } from "react";
import { Metadata } from 'next';
import { auth } from '@/auth';
import { fetch_task_group_pages } from '@/app/lib/data/task-group-sql';
import TaskGroupGrid from '@/app/ui/task-group/task-group-grid';
import Search from "@/app/ui/search";
import { CreateTaskGroup } from "@/app/ui/task-group/buttons";
import Pagination from "@/app/ui/pagination";
//!ADD SKELETON LOADING
import { lusitana } from "@/app/ui/fonts";


export const metadata: Metadata = {
    title: 'Tasks group | Task group | Dashboard',
};

export default async function Page({ searchParams, }: { searchParams?: { query?: string; page?: string; }; }) {
    const session = await auth()
    console.log('session', session)
    const user_id = session?.user?.id as string;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetch_task_group_pages(user_id, query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Task group</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search task groups..." />
                <CreateTaskGroup />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TaskGroupGrid user_id={user_id} query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
