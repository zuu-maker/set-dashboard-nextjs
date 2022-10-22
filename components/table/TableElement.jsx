import React from "react";

const TableElement = () => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="font-medium">React Project</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-6 h-6 rounded-full"
              src="https://randomuser.me/api/portraits/men/1.jpg"
            />
          </div>
          <span>Eshal Rosas</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center">
          <img
            className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <img
            className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
            src="https://randomuser.me/api/portraits/women/2.jpg"
          />
          <img
            className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
            src="https://randomuser.me/api/portraits/men/3.jpg"
          />
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
          Active
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
        </div>
      </td>
    </tr>
  );
};

export default TableElement;
