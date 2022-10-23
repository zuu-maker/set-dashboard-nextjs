import React from "react";

const TransactionElement = () => {
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
          <span className="text-lg font-semibold">Math 2066</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">0966778912</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">joebwalya@mail.com</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">Kasama</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">23-03-23</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">120</span>
      </td>
    </tr>
  );
};

export default TransactionElement;
