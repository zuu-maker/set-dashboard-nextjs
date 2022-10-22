import React from "react";
import Bin from "../util/Bin";

const TableElementTeacher = () => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">Joe Bwalya</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">2 Courses</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">0966778912</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">Kasama</span>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex item-center gap-2 justify-center">
          <button
            onClick={() => console.log("change role")}
            className="text-gray-700 bg-gradient-to-r from-green-200 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 transform cursor-pointer"
          >
            Make Student
          </button>
          <div
            onClick={() => console.log("delete")}
            className="transform hover:text-red-600 cursor-pointer hover:scale-105 mt-2"
          >
            <Bin />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableElementTeacher;
