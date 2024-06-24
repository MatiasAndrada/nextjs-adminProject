import { Metadata } from "next";
//components
import Breadcrumbs from "@/components/breadcrumbs";
import { RoleGate } from "@/components/auth/role-gate";
import MembersTable from "@/components/members/members-table";
import { CardsInvitation } from "@/components/invitation/card-invitation-send";
/* import Pagination from "@/components/pagination"; */
import { AddMember } from "@/components/members/buttons";
import { fetch_task_group_pages } from "@/data/task-group";
import { Role } from "@prisma/client";

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
                <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]}>
                    <AddMember />
                </RoleGate>
            </div>
            <MembersTable query={query} currentPage={currentPage} />

            {/*             <Suspense fallback={<Loader1 />}>
                <TaskGroupGrid query={query} currentPage={currentPage} />
                
                </Suspense>

            <div className="flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div> */}
            <h2 className="text-xl">members with invitation sent: </h2>
            <CardsInvitation />
        </div>

    );
}
