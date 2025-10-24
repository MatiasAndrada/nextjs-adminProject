import { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import { RoleGate } from "@/components/auth/role-gate";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { CreateTask } from "@/components/tasks/redirects";
import { fetch_task_pages } from "@/data/task";
import { Role } from "@prisma/client";
import { TasksTableSkeleton } from "@/components/skeletons";
import { skeletonDelay } from "@/lib/skeleton-delay";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Admin",
    default: "Tasks",
  },
  description: "",
};

// Componente para la tabla de tareas
async function TasksTable({ query, currentPage }: { query: string; currentPage: number }) {
  // Delay configurable para testing de skeletons (controlado por env var)
  await skeletonDelay();
  
  return <Table query={query} currentPage={currentPage} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetch_task_pages(query);

  return (
    <div className="w-full space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Tasks", href: "/dashboard/tasks", active: true },
        ]}
      />
      
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Search tasks..." />
        <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]}>
          <CreateTask />
        </RoleGate>
      </div>

      <Suspense fallback={<TasksTableSkeleton />}>
        <TasksTable query={query} currentPage={currentPage} />
      </Suspense>
      {totalPages > 1 && (
        <div className="flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
