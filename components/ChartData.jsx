import React from "react";
import PieChart from "./PieChart";
import BarChat from "./BarChat";

const ChartData = ({ data, b }) => {
  // console.log(barChatData);
  const { pieChartData } = data;

  const pieData = {
    labels: ["Never Subscribed ", "Currently Subscribed"],
    datasets: [
      {
        label: "'# of Votes'",
        data: pieChartData,
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
        data: b,
        backgroundColor: "#047857",
      },
    ],
  };

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
