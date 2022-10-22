import React from "react";

const TableHead = ({ thead }) => {
  return (
    <thead>
      <tr className="bg-cyan-700 text-gray-300 uppercase text-sm leading-normal">
        {thead.map((el, i) => (
          <th key={i} className="py-3 px-4 text-left">
            {el}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
