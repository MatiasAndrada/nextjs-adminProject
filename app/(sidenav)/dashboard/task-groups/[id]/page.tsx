/* import { Metadata } from "next"; */
/* import { notFound } from "next/navigation"; */
import * as Tabs from "@radix-ui/react-tabs";
import Breadcrumbs from "@/components/breadcrumbs";
import TaskGroupDetails from "@/components/task-group/task-group-details";
import TaskGroupDetailTabs from "@/components/task-group/tabs";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { TaskGroupChat } from "@/components/chat/taskgroup-chat";
import { fetch_task_pages } from "@/data/task";
import { fetch_task_group_by_id } from "@/data/task-group";
import { auth } from "@/auth";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { page: number; query: string };
}) {
  searchParams = searchParams || { page: 1, query: "" };
  /*     const totalPages = await fetch_task_group_pages(query); */
  const id = params.id;
  const session = await auth();
  const taskGroup = await fetch_task_group_by_id(id);

  return (
    <main className="space-y-4 relative">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Task Groups", href: "/dashboard/task-groups" },
          {
            label: "Task Group",
            href: `/dashboard/task-groups/${id}`,
            active: true,
          },
        ]}
      />
      <TaskGroupDetails id={id} />
      <TaskGroupDetailTabs id={id} searchParams={searchParams} />
      
      {/* Chat flotante del task group */}
      {taskGroup && session?.user?.id && (
        <TaskGroupChat
          taskGroupId={id}
          taskGroupName={taskGroup.name}
          currentUserId={session.user.id}
          currentUserName={session.user.name || "Usuario"}
        />
      )}
    </main>
  );
}
