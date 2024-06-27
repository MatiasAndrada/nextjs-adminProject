import DoughnutChart from "./DoughnutChart";
import { fetch_count_status_tasks } from "@/data/task";

async function AsideDashboard({ id }: { id: string }) {
    const countStatusTasks = await fetch_count_status_tasks(id);
    if ('error' in countStatusTasks) {
        return <span className="text-red text-sm">Error: {countStatusTasks?.error}</span>;
    }
    return (
        <div className="col-span-1 row-span-4  flex flex-col justify-between items-center">
            <h3 className="text-center text-xl font-bold mb-0 h-20">
                Mensajes
            </h3>
            <DoughnutChart countStatusTasks={countStatusTasks} />
        </div>
    );
}

export default AsideDashboard;
