import DoughnutChart from "./DoughnutChart";
import { fetch_count_status_tasks } from "@/data/task";

async function AsideDashboard({ id }: { id: string }) {
    const countStatusTasks = await fetch_count_status_tasks(id);
    if ('error' in countStatusTasks) {
        return <span className="text-red text-sm">Error: {countStatusTasks?.error}</span>;
    }
    return (
        <div className="col-span-1 row-span-4 flex flex-col justify-evenly items-center">
            {/*             <h3 className="text-center text-xl font-bold mb-0 h-20">
                Mensajes
            </h3> */}
            {countStatusTasks.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 ">
                    <h2 className="text-lg  text-gray-400">There are no tasks</h2>
                </div>
            ) : (
                < h3 className="text-center text-xl font-bold">
                    Status of all tasks
                </h3>
            )
            }
            <DoughnutChart countStatusTasks={countStatusTasks} />
        </div>
    );
}

export default AsideDashboard;
