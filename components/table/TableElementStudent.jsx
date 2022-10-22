import React from "react";
import Bin from "../util/Bin";

const TableElementStudent = () => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">Ben Chalwe</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">user@gmail.com</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">4 Classe(s)</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">2002-01-22</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">0977886512</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">Kasama</span>
      </td>
      <td className="py-3 px-6 text-left">
        <div
          onClick={() => console.log("delete")}
          className="transform hover:text-red-600 cursor-pointer hover:scale-105 mt-2"
        >
          <Bin />
        </div>
      </td>
    </tr>
  );
};

export default TableElementStudent;
