import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
};

const PieChart = ({ data }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
