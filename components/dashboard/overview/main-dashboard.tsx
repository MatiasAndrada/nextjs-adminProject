import { Suspense } from "react";
import Table from "./table";
import Filter from "./filter";
import { InvoicesTableSkeleton } from "@/components/skeletons";
import Pagination from "@/components/pagination";
import { fetch_filtered_task_group, fetch_task_group_pages } from "@/data/task-group";
import type { TaskGroup } from '@prisma/client';



export default async function MainDashboard({ name, description, searchParams }: {
    name: string,
    description: string | null,
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const taskGroup = await fetch_filtered_task_group(query, currentPage);
    const totalPages = await fetch_task_group_pages(query);


    return (
        <section className="h-fit col-span-2 p-2 my-2 rounded-lg bg-slate-300 dark:bg-gray-800 dark:text-gray-100 ">
            <div className="ml-6">
                <span className="ml-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Name:
                </span>
                <h3 className="ml-4 py-2 text-2xl font-bold ">
                    {name}
                </h3>
                <p className="ml-4 mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Description:
                </p>
                <p className="text-sm font-medium max-h-64 overflow-y-auto">
                    {description}
                </p>

            </div>
            <div className="mt-2">
                {/*                 <h3>TASK GROUPS STATE</h3> */}
                <div className="container p-2 mx-auto sm:p-4 dark:dark:text-gray-100">
                    <div className="flex flex-row justify-between">
                        <h2 className="mb-4 text-2xl font-semibold leadi">Task group status</h2>
                        <Filter />
                    </div>
                    {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
                    <div className="overflow-x-auto">
                        <Table query={query} currentPage={currentPage} taskGroup={taskGroup} />
                    </div>
                    {/*</Suspense>*/}
                    <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div>
                </div>
            </div>
        </section>
    );
}
