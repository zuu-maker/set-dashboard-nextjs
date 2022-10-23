import React from "react";
import TableElementStats from "./TableElementStats";
import TableElementStudent from "./TableElementStudent";
import TableElementTeacher from "./TableElementTeacher";
import DashElement from "./TableElementDash";
import TableHead from "./TableHead";

const items = [1, 1, 1, 1, 1, 1];

const Table = ({
  thead,
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
            {isTeacher && items.map((el, i) => <TableElementTeacher key={i} />)}
            {isStudent && items.map((el, i) => <TableElementStudent key={i} />)}
            {isStats && items.map((el, i) => <TableElementStats key={i} />)}
            {isDash && items.map((el, i) => <DashElement key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
