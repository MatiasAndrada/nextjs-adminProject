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
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

const config = {
    type: 'pie',
    data: data,
};

function DoughnutChart() {
    return (
        <div
            style={{
                width: "100%",
                height: "70%",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Doughnut data={data} ></Doughnut>
        </div>

    );
}

export default DoughnutChart;
