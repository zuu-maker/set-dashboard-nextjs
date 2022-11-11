import React from "react";
import TableElementStats from "./TableElementStats";
import TableElementStudent from "./TableElementStudent";
import TableElementTeacher from "./TableElementTeacher";
import DashElement from "./TableElementDash";
import TableHead from "./TableHead";

const items = [1, 1, 1, 1, 1, 1];

const Table = ({
  thead,
  data,
  isStudent = false,
  isTeacher = false,
  isStats = false,
  isDash = false,
}) => {
  return (
    <div className="w-full ">
      <div className="bg-white shadow-md rounded my-6">
        <table className=" w-full table-auto">
          <TableHead thead={thead} />
          <tbody className="text-gray-600 text-sm font-light">
            {isTeacher &&
              data?.teachers?.map((el, i) => (
                <TableElementTeacher
                  teacher={el}
                  n={data.numOfCourses[i]}
                  key={i}
                />
              ))}
            {isStudent &&
              data?.map((el, i) => (
                <TableElementStudent student={el} key={i} />
              ))}
            {isStats &&
              data?.map((el, i) => <TableElementStats stat={el} key={i} />)}
            {isDash && data?.map((el, i) => <DashElement el={el} key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
