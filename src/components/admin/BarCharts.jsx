import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ incomeValue, time }) => {
  // console.log(incomeValue);
  // const [chartData, setChartData] = useState({
  //     labels: time,
  //   datasets: [
  //     {
  //       label: "Income",
  //       data: incomeValue,
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // });
  const chartData = {
    labels: time,
    datasets: [
      {
        label: "Income",
        data: incomeValue,
        backgroundColor: "rgb(157, 123, 106)",
        borderColor: "#dddddd",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar data={chartData} />
    </>
  );
};


export default BarChart;
