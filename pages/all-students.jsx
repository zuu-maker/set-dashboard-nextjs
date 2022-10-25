import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import StudentRole from "../components/table/StudentRole";

const students = [
  {
    name: "Jane Doe",
    phone: "095587656",
    subcription: {
      paidOn: "21St Jan 2020",
      subDuration: "1 Month",
      endsOn: "21ST Feb 2023",
    },
  },
  {
    name: "Jane Doe",
    phone: "095587656",
    subcription: {
      paidOn: "21St Jan 2020",
      subDuration: "1 Month",
      endsOn: "21ST Feb 2023",
    },
  },
  {
    name: "Jane Doe",
    phone: "095587656",
    subcription: {
      paidOn: "21St Jan 2020",
      subDuration: "1 Month",
      endsOn: "21ST Feb 2023",
    },
  },
  {
    name: "Jane Doe",
    phone: "095587656",
    subcription: {
      paidOn: "21St Jan 2020",
      subDuration: "1 Month",
      endsOn: "21ST Feb 2023",
    },
  },
];

const allStudents = () => {
  return (
    <div>
      <Head>
        <title>SET - All Students </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 p-8">
            <h2 className="text-2xl font-semibold mb-3">All Students</h2>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {students.map((item, index) => (
                    <StudentRole key={index} student={item} i={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default allStudents;
