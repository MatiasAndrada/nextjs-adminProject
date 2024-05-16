import Link from "next/link"
import { UserGroupIcon, CalendarDaysIcon, RectangleStackIcon, DocumentCheckIcon } from "@heroicons/react/24/outline"
import { fetch_count_in_progress_task_group, fetch_count_total_task_group } from "@/data/task-group"
import { fetch_count_in_progress_task, fetch_count_total_tasks } from "@/data/task"
import { fetch_count_members } from "@/data/projects"
export default async function HeaderDashboard({ id }: { id: string }) {
    const countTaskGroupInProgress = await fetch_count_in_progress_task_group(id)
    const countTaskGroupTotal = await fetch_count_total_task_group(id)
    const countTaskInProgress = await fetch_count_in_progress_task(id)
    const countTaskTotal = await fetch_count_total_tasks(id)
    const members = await fetch_count_members(id)
    return (
        <section className="col-span-3 row-span-1">
            <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
                <Link href={`/dashboard/task-groups/create`} className="flex flex-col justify-center items-center p-4 rounded-lg text-primary hover:text-secondary bg-slate-300 dark:bg-slate-800">

                    <p className="text-md antialiased font-semibold leading-6 ">Create new task group</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </Link>

                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <DocumentCheckIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{countTaskInProgress} of {countTaskTotal}</p>
                        <p className="capitalize">Completed Task</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <RectangleStackIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{countTaskGroupInProgress} of {countTaskGroupTotal}</p>
                        <p className="capitalize">Completed Task Group</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <UserGroupIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{members}</p>
                        <p className="capitalize">Members</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-slate-300 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <CalendarDaysIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi disabled line-through">incoming </p>
                        <p className="capitalize">The Remaining Days</p>
                    </div>
                </div>
            </div>
        </section>
    )
}