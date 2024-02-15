import DoughnutChart from "./DoughnutChart";

function AsideDashboard() {
    return (
        <div className="row-span-2 flex flex-col justify-between items-center">
            <h3 className="text-center text-xl font-bold mb-0">
                Mensajes
            </h3>
            <div className="h-2/3 w-full ">
                <h3 className="text-center text-xl font-bold  mb-0">
                    Status of all tasks
                </h3>
                <DoughnutChart />
            </div>
        </div>
    );
}

export default AsideDashboard;
