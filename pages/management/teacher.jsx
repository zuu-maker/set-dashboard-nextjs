import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import TeacherTable from "../../components/table/Table";
import { readAll } from "../../lib/teacher";

const tableHead = ["Name", "Courses Assigned", "Phone", "City", "Actions"];

const TeacherView = () => {
  const [teachers, setTeachers] = useState([]);

  const loadTeachers = async () => {
    const data = await readAll();
    setTeachers(data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div className="">
      <Head>
        <title>SET - Teacher Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Manage Teahers</h2>
            <TeacherTable thead={tableHead} data={teachers} isTeacher={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
