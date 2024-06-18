/* import { Suspense } from "react"; */
import { Metadata } from "next";
//components
/* import { Loader1 } from "@/components/loaders"; */
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import MembersTable from "@/components/members/members-table";
/* import TaskGroupGrid from "@/components/task-group/task-group-grid";
import Pagination from "@/components/pagination"; */
import { AddMember } from "@/components/members/buttons";
import { fetch_task_group_pages } from "@/data/task-group";
//!ADD SKELETON LOADING


export const metadata: Metadata = {
    title: {
        template: "%s | Project Admin",
        default: "Members",
    },
    description: "",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetch_task_group_pages(query);
    return (
        <div className="w-full space-y-4">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    {
                        label: "Members",
                        href: "/dashboard/members",
                        active: true,
                    },
                ]}
            />

            <div className="flex items-center justify-end gap-2">
{/*                 <Search placeholder="Search member..." /> */}
                <AddMember />
            </div>

                <MembersTable query={query} currentPage={currentPage} />
            
            {/*             <Suspense fallback={<Loader1 />}>
                <TaskGroupGrid query={query} currentPage={currentPage} />
                
                </Suspense>

            <div className="flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div> */}
            <h2>Invitations: </h2>
        </div>

    );
}
