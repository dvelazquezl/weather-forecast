import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register("line");

export default function CustomChart({ labels, temperatures }) {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: temperatures,
        borderColor: "rgb(6, 182, 212)",
        backgroundColor: "rgb(6, 182, 212, 0.5)",
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Temperature throughout the day",
        font: {
          size: 14,
          weight: "normal",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} °C`;
          },
        },
      },
    },
  };
  return <Line data={data} options={options} />;
}
