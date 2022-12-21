import React from "react";

const TransactionElement = ({ el }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">{el && el.userId.name}</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">
            {el && el?.courseId?.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{el && el.userId.phone}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{el && el.userId.email}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{el && el.userId.city}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">
          {el && el.createdAt.split("T")[0]}
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">K{el && el.amount}</span>
      </td>
      <td className="py-3 px-2 text-left">
        {el && el.status === "Paid" ? (
          <span className="bg-green-200 text-grey-600 py-1 px-2 rounded-full text-sm">
            Paid
          </span>
        ) : (
          <span className="bg-yellow-300 text-grey-600 py-1 px-2 rounded-full text-sm">
            not Paid
          </span>
        )}
      </td>
    </tr>
  );
};

export default TransactionElement;
