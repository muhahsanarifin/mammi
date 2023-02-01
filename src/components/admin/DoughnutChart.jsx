import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function DoughnutChart({ status, data }) {
  const chartData = {
    labels: [status === "Pending" ? "Pending" : "Delivered"],
    datasets: [
      {
        label:
          status === "Pending" ? "Pending | User ID" : "Delivered | User ID",
        data: data,
        backgroundColor: status === "Pending" ? "#eb1d36" : "#0081b4",
      },
    ],
  };
  return <Doughnut data={chartData} />;
}

export default DoughnutChart;
