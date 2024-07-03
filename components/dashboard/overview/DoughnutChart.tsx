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
                    ? `${task.value} Pending`
                    : task.status === Status.IN_PROGRESS
                        ? `${task.value} In Progress`
                        : `${task.value} Completed`
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
            border: 0,
            hoverBorderColor: '#000000',
            /*             borderColor: '#000000', */
        }]
    };
    return (
        <Doughnut data={data}
            options={{
                /*                 cutout: '50%', */
                animation: {
                    animateRotate: true,
                    animateScale: true,
                },
                plugins: {
                    legend: {
                        labels: {
                            padding: 20,
                            color: '#FAFAFA',
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 35,
                        bottom: 35,
                        left: 35,
                        right: 35
                    }
                }
            }}
        />
    );
}

export default DoughnutChart;
