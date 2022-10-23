import React from "react";

const StatsCard = ({ title, stat, Icon }) => {
  return (
    <div className="bg-cyan-700 shadow-md rounded-md flex items-center justify-between px-4 py-5 border-b-4 border-cyan-800  text-white font-medium group">
      <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
        <Icon />
      </div>
      <div className="text-right">
        <p className="text-2xl">{stat}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
