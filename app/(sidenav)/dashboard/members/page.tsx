import { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { RoleGate } from "@/components/auth/role-gate";
import MembersTable from "@/components/members/members-table";
import { CardsInvitation } from "@/components/invitation/card-invitation-sent-to-the-project";
import { AddMember, InformationRole } from "@/components/members/redirects";
import { fetch_task_group_pages } from "@/data/task-group";
import { Role } from "@prisma/client";
import { MembersTableSkeleton, ProjectsGridSkeleton } from "@/components/skeletons";
import { skeletonDelay } from "@/lib/skeleton-delay";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Admin",
    default: "Members",
  },
  description: "",
};

// Componente para la tabla de miembros
async function MembersTableWrapper({ query, currentPage }: { query: string; currentPage: number }) {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  return <MembersTable query={query} currentPage={currentPage} />;
}

// Componente para las invitaciones
async function InvitationsSection() {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  return <CardsInvitation />;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetch_task_group_pages(query);
  
  return (
    <section className="w-full space-y-4">
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

      <div className="flex items-center justify-between gap-2">
        <InformationRole />
        <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]}>
          <AddMember />
        </RoleGate>
      </div>
      
      <Suspense fallback={<MembersTableSkeleton />}>
        <MembersTableWrapper query={query} currentPage={currentPage} />
      </Suspense>

      <h2 className="text-xl normal-case">Members with invitation sent:</h2>
      
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <InvitationsSection />
      </Suspense>
    </section>
  );
}
