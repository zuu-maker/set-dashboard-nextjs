import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

const AdminNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="sticky top-0 z-10">
      <nav className="bg-gray-100 border-gray-200  ">
        <div className="flex items-center px-4 md:px-6 py-2.5 justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={68} height={60} className="mr-3 " />
          </div>
          <span className="self-center text-lg white  space-nowrap text-sky-900">
            <span className="font-bold">{user && `${user.role}:`}</span>{" "}
            {user && user.name}
          </span>
        </div>
      </nav>
      <nav className="bg-gray-700">
        <div className="py-3 px-4 md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm h-6 font-medium"></ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
