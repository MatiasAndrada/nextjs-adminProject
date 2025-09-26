import { fetch_filtered_task_group } from "@/data/task-group";
import { TaskGroupWithUnread } from "@/components/task-group/task-group-with-unread";
import { auth } from "@/auth";

export default async function TaskGroupGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const task_groups = await fetch_filtered_task_group(query, currentPage);
  const session = await auth();

  return (
    <div className="  grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
      {task_groups.map((task, index) => (
        <TaskGroupWithUnread 
          key={index} 
          task={task} 
          userId={session?.user?.id || ""} 
        />
      ))}
    </div>
  );
}
