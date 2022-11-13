import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { ADMIN } from "../../features/userSlice";

const StudentRole = ({ id, name, phone, student, i }) => {
  const { user } = useSelector((state) => state);

  let date = new Date(student.nextPayDate);

  const cancelSub = () => {
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cancel-subscription`, {
      id,
    });
  };

  const sub = () => {
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-subscription`, {
      id,
    });
  };

  return (
    <tr
      tabIndex="0"
      className="focus:outline-none h-16 border border-gray-200 rounded"
    >
      <td>
        <div className="flex items-center pl-5">
          <p className="text-base font-medium leading-none text-gray-700 mr-2">
            <span className="font-semibold">Student Name:</span> {name}
          </p>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <p className="ml-2">
            <span className="font-semibold">Enrolled Course:</span>{" "}
            {student?.course?.name}
          </p>
        </div>
      </td>
      <td className="pl-5">
        <div className="flex items-center">
          <span className="font-semibold">Subsctiption Duration:</span> 1 Month
        </div>
      </td>
      <td className="pl-5">
        <div className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
          <span className="font-semibold">Ends On: </span>
          {"  "}
          {date?.toISOString().split("T")[0]}
        </div>
      </td>

      {user && user.role === ADMIN && (
        <>
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">
                <span className="font-semibold">Phone:</span> {phone}
              </p>
            </div>
          </td>
          <td className="pl-4">
            {student.subscribed ? (
              <button
                onClick={sub}
                className="flex items-center py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded   "
              >
                Subscribe
              </button>
            ) : (
              <button
                onClick={cancelSub}
                className="flex items-center py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded   "
              >
                Cancel Subscription
              </button>
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentRole;
