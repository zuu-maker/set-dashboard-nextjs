import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import StudentTable from "../../components/table/Table";

const tableHead = [
  "Name",
  "Email",
  "Enrolled Courses",
  "DOB",
  "Phone",
  "City",
  "Actions",
];

const StudentView = () => {
  return (
    <div className="">
      <Head>
        <title>SET - Student Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Manage Students</h2>
            <StudentTable thead={tableHead} isStudent={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
