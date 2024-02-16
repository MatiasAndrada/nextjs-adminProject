import { UserGroupIcon, CalendarDaysIcon, RectangleStackIcon, DocumentCheckIcon } from "@heroicons/react/24/outline"
import { fetch_count_in_progress_task_group, fetch_count_total_task_group } from "@/data/task-group"
import { fetch_count_active_task } from "@/data/task"
import { fetch_count_members } from "@/data/projects"
export default async function HeaderDashboard(props: { id: string }) {
    const countTaskGroupInProgress = await fetch_count_in_progress_task_group(props.id)
    const countTaskGroupTotal = await fetch_count_total_task_group(props.id)
    const activeTask = await fetch_count_active_task(props.id)
    const members = await fetch_count_members(props.id)



    return (
        <section className="col-span-3 ">
            <div className="container grid grid-cols-1 gap-2  mx-auto sm:grid-cols-2 xl:grid-cols-5">
                <div className="flex flex-col justify-center items-center p-4 rounded-lg  bg-gray-200 dark:bg-slate-800">
                    <p className="text-md antialiased font-semibold leading-6 ">Create new task group</p>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <DocumentCheckIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{activeTask}</p>
                        <p className="capitalize">Active Task</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <RectangleStackIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{countTaskGroupInProgress} of {countTaskGroupTotal}</p>
                        <p className="capitalize">Completed Task Group</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 dark:bg-slate-800 dark:text-gray-100">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 dark:bg-blue-400">
                        <UserGroupIcon className="h-6 w-6 dark:text-gray-800" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">{members}</p>
                        <p className="capitalize">Members</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-200 dark:bg-slate-800 dark:text-gray-100">
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