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

interface Props {
    countStatusTasks: {
        status: string;
        value: number;
    }[];
}

function DoughnutChart({ countStatusTasks }: Props) {
    const data = {
        labels: countStatusTasks.map((task) => task.status),
        datasets: [{
            data: countStatusTasks.map((task) => task.value),
            backgroundColor: [
                '#f5a523',
                '#fff700',
                '#0cc7e9',
                '#00fc11'
            ],
            hoverOffset: 35
        }]
    };
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
