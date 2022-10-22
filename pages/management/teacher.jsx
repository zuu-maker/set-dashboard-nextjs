import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import TeacherTable from "../../components/table/Table";

const tableHead = ["Name", "Courses Assigned", "Phone", "City", "Actions"];

const TeacherView = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Manage Teahers</h2>
            <TeacherTable thead={tableHead} isTeacher={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
