import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ formData, maizeProduction }) => {
    const data = {
        labels: ["Temperature (°C)", "Rainfall (mm)", "Soil pH"],
        datasets: [
            {
                label: "Factor Value",
                data: [formData.temperature, formData.rainfall, formData.soilph],
                backgroundColor: "rgba(75, 192, 192, 0.6)", 
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Maize Production (kg)",
                data: [maizeProduction, maizeProduction, maizeProduction], // Same production value for comparison
                backgroundColor: "rgba(255, 99, 132, 0.6)", 
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
