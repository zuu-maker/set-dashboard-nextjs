import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import Bin from "../util/Bin";

const TableElementTeacher = ({ teacher, n }) => {
  const deleteTeacher = async () => {
    let answer = window.confirm(
      "Are you sure you want to permanetly delete " +
        teacher.name +
        "? Please ensure all of the teacher's courses have been reassigned"
    );
    if (answer) {
      alert(
        "Please ensure that all of " +
          teacher.name +
          "'s courses have been reassigned to another teacher"
      );

      if (teacher._id.length > 0) {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-teacher/${teacher._id}`
        );
        if (data.ok) {
          toast.success("Teacher deleted");
          return;
        }
        toast.error("failed to delete");
      }
    }
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">{teacher.name}</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">{n} Course(s)</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{teacher.phone}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{teacher.city}</span>
      </td>
      <td className="py-3  text-left">
        <div className="flex item-center gap-2 justify-center">
          {/* <button
            onClick={() => console.log("change role")}
            className="text-gray-700 bg-gradient-to-r from-green-200 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 transform cursor-pointer"
          >
            Make Student
          </button> */}
          <div
            onClick={deleteTeacher}
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
