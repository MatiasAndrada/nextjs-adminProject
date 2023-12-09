import { Metadata } from 'next';
import TaskGroupGrid from '@/app/ui/task-group/task-group-grid';
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
/* import { InvoicesTableSkeleton } from "@/app/ui/skeletons"; */
import { lusitana } from "@/app/ui/fonts";
import { fetch_task_pages } from '@/app/lib/data/task-group';
import { Suspense } from "react";


export const metadata: Metadata = {
    title: 'Tasks group | Task group | Dashboard',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetch_task_pages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Task group</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search task groups..." />
                {/*         <CreateInvoice /> */}
            </div>
            <Suspense fallback={<div>Loading...</div>}>

                <TaskGroupGrid query={query} currentPage={currentPage} />
                {/*                 {<Table
                    currentPage={currentPage}
                    query={query}
                />} */}
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
