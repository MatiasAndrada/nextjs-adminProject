import { fetch_filtered_task_group } from "@/app/lib/data/task-group";
import TableBody from "./table-body";
import { tasks } from "@/app/lib/placeholder-data";
export default async function TaskTable() {

    return (
        <section className="flex flex-col justify-center antialiased  text-gray-600">
            <div className="h-full">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm ">
                    {/*        <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Customers</h2>
                    </header> */}
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Task Id</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Owner</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Status</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Progress</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Ends At</div>
                                        </th>
                                    </tr>
                                </thead>
                                {/*  <TableBody fields={tasks} /> */}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}