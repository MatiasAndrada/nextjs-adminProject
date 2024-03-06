"use client";
import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement, // Add ArcElement for Doughnut chart
    /*     LineElement,
        CategoryScale,
        LinearScale, */
    /*     PointElement, */
    Legend,
    Tooltip,
    /*     Filler, */
} from "chart.js";

ChartJS.register(
    ArcElement, // Register ArcElement
    /*
    LineElement,
    CategoryScale,
    LinearScale, */
    /*    PointElement, */
    Legend,
    Tooltip,
    /* Filler */
);

// Your chart data...
const data = {
    labels: ['Paused', 'Pending', 'In Progress', 'Completed'],
    datasets: [{
        /*  label: 'Colors', */
        data: [300, 50, 100, 100],
        backgroundColor: [
            '#00d5ff',
            '#0f37da',
            '#f59e23',
            '#e71d1d'
        ],
        hoverOffset: 35
    }]
};

function DoughnutChart() {
    return (
        <>
            <h3 className="text-center text-xl font-bold">
                Status of all tasks
            </h3>


            <Doughnut data={data}
                options={{
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                boxWidth: 20,
                                padding: 20,
                                color: 'white',
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 40,
                            bottom: 40,
                            left: 40,
                            right: 40
                        }
                    }
                }}
            ></Doughnut>

        </>

    );
}

export default DoughnutChart;
