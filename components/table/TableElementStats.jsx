import React from "react";
import Edit from "../util/Edit";
import { useRouter } from "next/router";

const TableElementStats = ({ stat }) => {
  const router = useRouter();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">{stat.name}</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">{stat.teacher.name}</span>
        </div>
      </td>
      <td className="py-3 px-3 text-left">
        <span className="text-lg font-semibold">{stat.duration}</span>
      </td>
      <td className="py-3 px-10 text-left">
        <span className="text-md font-semibold">
          {stat.start.split("T")[0]}
        </span>
      </td>
      <td className="py-3 px-10 text-left">
        <span className="text-md font-semibold">{stat.end.split("T")[0]}</span>
      </td>
      <td className="py-3 px-2 text-left">
        <span className="text-lg font-semibold">{stat.lessons.length}</span>
      </td>
      <td className="py-3 px-2 text-left">
        <span className="text-lg font-semibold">{stat.lessons.length}</span>
      </td>
      <td className="py-3 px-10 text-left">
        <span className="text-md font-semibold">
          {stat.updatedAt.split("T")[0]}
        </span>
      </td>
      <td className="py-3 px-5 text-left">
        {stat.published ? (
          <span className="bg-green-200 text-grey-600 py-1 px-3 rounded-full text-sm">
            Published
          </span>
        ) : (
          <span className="bg-red-300 text-grey-600 py-1 px-3 rounded-full text-sm">
            Unpublished
          </span>
        )}
      </td>
      <td className="py-3 px-6 text-left">
        <div
          onClick={() => router.push(`/course/${stat.slug}`)}
          className="transform hover:text-green-600 cursor-pointer hover:scale-105 mt-2"
        >
          <Edit />
        </div>
      </td>
    </tr>
  );
};

export default TableElementStats;
