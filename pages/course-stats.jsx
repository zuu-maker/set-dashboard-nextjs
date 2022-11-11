import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import StatsTable from "../components/table/Table";
import { readWithTeachers } from "../lib/course";

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
  const [stats, setStats] = useState([]);

  const loadCourses = async () => {
    const data = await readWithTeachers();
    setStats(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <Head>
        <title>SET - Course Stats</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-3">
            <h2 className="text-2xl font-semibold">Course Stats</h2>
            <StatsTable thead={tableHead} data={stats} isStats={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
