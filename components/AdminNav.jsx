import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const AdminNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="sticky top-0 z-10">
      <nav className="bg-white border-gray-200  dark:bg-gray-900">
        <div className="flex items-center px-4 md:px-6 py-2.5 justify-between">
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            SET - Dashboard
          </span>
          <span className="self-center text-md white font-bold space-nowrap text-sky-900">
            {user && `${user.role}: ${user.name}`}
          </span>
        </div>
      </nav>
      <nav className="bg-gray-700">
        <div className="py-3 px-4 md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li className="text-white hover:underline">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="text-white hover:underline">
                <Link href="/course">My Courses</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
