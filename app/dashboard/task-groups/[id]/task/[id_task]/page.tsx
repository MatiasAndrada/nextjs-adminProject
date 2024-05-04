/* "use client" */
import { Metadata } from "next";
import { lusitana, inter } from "@/components/fonts";
import Breadcrumbs from "@/components/breadcrumbs";
import TabsContent from "@/components/tasks/tabs/tabs";
import { fetch_task } from "@/data/task";

export const metadata: Metadata = {
    title: 'Task',
};

export default async function Page({
    params: { id, id_task },
}: {
    params: { id: string; id_task: string };
}) {
    const task = await fetch_task(id_task);
    if (!task) {
        return <div>Task not found</div>;
    }
    const { name, description, status, progress, createdAt, updatedAt, endsAt } =
        task;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    {
                        label: "Task Groups",
                        href: "/dashboard/task-groups",
                        active: true,
                    },
                    {
                        label: "Tasks of Task Group",
                        href: `/dashboard/task-groups/${id}`,
                        active: true,
                    },
                    {
                        label: "Task Details",
                        href: `/dashboard/task-groups/${id}/task/${id_task}`,
                        active: true,
                    },
                ]}
            />
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-4xl my-2 `}>Task Details</h1>
            </div>
            <div className="grid grid-cols-5 grid-rows-3 gap-4">
                <div className="col-span-2 row-span-2">
                    <div className="flex flex-col items-start justify-start p-2 divide-y-4 divide-slate-900 bg-slate-300 dark:bg-slate-800 rounded-lg shadow-md gap-4">
                        <div>
                            <p className="my-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                                Name:
                            </p>
                            <h2 className={`${inter.className} text-4xl `}>
                                {name ?? ""}
                                {!name?.endsWith(".") && "."}
                            </h2>
                        </div>
                        <div>
                            <p className="my-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                                Description:
                            </p>
                            <p className={`${inter.className} text-lg `}>
                                {description ?? ""}
                                {!description?.endsWith(".") && "."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 row-span-2">
                    <TabsContent
                        status={status}
                        progress={progress}
                        createdAt={createdAt}
                    />
                </div>
            </div>
        </main>
    );
}
