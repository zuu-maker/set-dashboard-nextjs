import React from "react";
import Bin from "../util/Bin";
import axios from "axios";
import { useSelector } from "react-redux";
import { ADMIN } from "../../features/userSlice";

const TableElementStudent = ({ student }) => {
  const { user } = useSelector((state) => state);

  const deleteStudent = async () => {
    let answer = window.confirm(
      "Are you sure you want to permanetly delete " + student.name + "?"
    );
    if (answer) {
      if (student._id.length > 0) {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-user/${student._id}`
        );
        if (data.ok) {
          alert("delete");
          return;
        }
        alert("failed to delete");
      }
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <span className="text-lg font-semibold">{student.name}</span>
        </div>
      </td>
      <td className="py-3 px-6">
        <div className="flex items-left">
          <span className="text-lg font-semibold">{student.email}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">
          {student.courses.length} Classe(s)
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        {student.date > 0 ? (
          <span className="text-lg font-semibold">{student.date}</span>
        ) : (
          <span className="text-lg font-semibold">Nan</span>
        )}
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{student.phone}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span className="text-lg font-semibold">{student.city}</span>
      </td>
      <td className="py-3 px-6 text-left">
        {user?.role === ADMIN && (
          <div
            onClick={deleteStudent}
            className="transform hover:text-red-600 cursor-pointer hover:scale-105 mt-2"
          >
            <Bin />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableElementStudent;
