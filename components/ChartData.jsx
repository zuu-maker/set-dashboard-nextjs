import React from "react";
import PieChart from "./PieChart";
import BarChat from "./BarChat";

const pieData = {
  labels: ["Not Subscribed ", "Subscribed "],
  datasets: [
    {
      label: "'# of Votes'",
      data: [40, 127],
      backgroundColor: ["#0e7490", "#047857"],
      borderColor: ["#67e8f9", "#6ee7b7"],
      //   borderWidth: 1,
    },
  ],
};

const barData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Amount",
      data: [
        1000, 2000, 4000, 1000, 8000, 10000, 20000, 30000, 48000, 100000, 90000,
        70000,
      ],
      backgroundColor: "#047857",
    },
  ],
};

const ChartData = () => {
  return (
    <div className=" flex items-center space-x-16 pb-16">
      <div className="mt-5 relative h-80">
        <PieChart data={pieData} />
      </div>
      <div className="basis-2/3 h-80">
        <BarChat data={barData} />
      </div>
    </div>
  );
};

export default ChartData;
