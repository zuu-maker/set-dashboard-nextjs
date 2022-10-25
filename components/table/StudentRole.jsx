import React from "react";
import { useSelector } from "react-redux";
import { ADMIN } from "../../features/userSlice";

const StudentRole = ({ student, i }) => {
  const { user } = useSelector((state) => state);
  return (
    <tr
      tabIndex="0"
      className="focus:outline-none h-16 border border-gray-100 rounded"
    >
      <td>
        <div className="ml-5">
          <div className="bg-gray-400 rounded-sm w-7 h-7 flex flex-shrink-0 justify-center items-center relative">
            <div className="check-icon  text-white rounded-sm">{i + 1}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center pl-5">
          <p className="text-base font-medium leading-none text-gray-700 mr-2">
            <span className="font-semibold">Student Name:</span> {student.name}
          </p>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <p className="ml-2">
            <span className="font-semibold">Paid On:</span>{" "}
            {student.subcription.paidOn}
          </p>
        </div>
      </td>
      <td className="pl-5">
        <div className="flex items-center">
          <span className="font-semibold">Subsctiption Duration:</span>{" "}
          {student.subcription.subDuration}
        </div>
      </td>
      <td className="pl-5">
        <div className="flex items-center py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
          <span className="font-semibold">Ends On:</span>{" "}
          {student.subcription.endsOn}
        </div>
      </td>

      {user && user.role === ADMIN && (
        <>
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">
                <span className="font-semibold">Phone:</span> {student.phone}
              </p>
            </div>
          </td>
          <td className="pl-4">
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
              Cancel Subscription
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentRole;
