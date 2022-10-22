import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import StatsTable from "../components/table/Table";

const tableHead = [
  "Course Name",
  "Teacher",
  "Duration",
  "Start",
  "End",
  "NO. Students",
  "NO. Lessons",
  "Last Updated",
  "Status",
  "Actions",
];

const CourseStats = () => {
  return (
    <div>
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
          <div className="basis-5/6 p-3">
            <h2 className="text-2xl font-semibold">All Courses</h2>
            <StatsTable thead={tableHead} isStats={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
