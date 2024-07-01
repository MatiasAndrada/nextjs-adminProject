"use client";
import { Doughnut } from "react-chartjs-2";
import { Status } from "@prisma/client";

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
        labels: countStatusTasks.map((task) =>
            task.status === Status.PAUSED
                ? `${task.value} Paused`
                : task.status === Status.PENDING
                    ? "Pending"
                    : task.status === Status.IN_PROGRESS
                        ? "In Progress"
                        : "Completed"
        ),
        datasets: [{
            data: countStatusTasks.map((task) => task.value),
            backgroundColor: [
                '#f5a523',
                '#fff700',
                '#0cc7e9',
                '#00fc11'
            ],
            hoverOffset: 35,
            border: 0
            /*             borderColor: '#000000', */
        }]
    };
    return (
        <Doughnut data={data}
            options={{
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 20,
                            padding: 20,
                            color: '#9A9A9A',
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
        />
    );
}

export default DoughnutChart;
