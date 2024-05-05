import { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { CreateTask } from "@/components/tasks/buttons";
import { fetch_task_pages } from "@/data/task";

export const metadata: Metadata = {
    title: {
        template: "%s | Project Admin",
        default: "Tasks",
    },
    description: "",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    /*     const tasks = await fetch_all_tasks_of_project(); */
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetch_task_pages(query);

    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Tasks", href: "/dashboard/tasks", active: true },
                ]}
            />
            <div>
                <h2 className="text-xl font-base">All task of project</h2>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 mx-6">
                <Search placeholder="Search task groups..." />
                <CreateTask />
            </div>
            <div className="mt-4 ">
                <Table query={query} currentPage={currentPage} />
                {totalPages > 1 &&
                    <div className="flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div>
                }
            </div>
        </div>
    );
}
