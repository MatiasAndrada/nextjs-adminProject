import DoughnutChart from "./DoughnutChart";

function AsideDashboard() {
    return (
        <div className="col-span-1 row-span-4  flex flex-col justify-between items-center">
            <h3 className="text-center text-xl font-bold mb-0 h-20">
                Mensajes
            </h3>

            <DoughnutChart />

        </div>
    );
}

export default AsideDashboard;
