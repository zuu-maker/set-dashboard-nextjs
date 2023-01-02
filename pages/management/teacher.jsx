import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import TeacherTable from "../../components/table/Table";
import { readAll } from "../../lib/teacher";
import AdminRoute from "../../components/routes/AdminRoute";

const tableHead = ["Name", "Courses Assigned", "Phone", "City", "Actions"];

const TeacherView = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);

  const loadTeachers = async () => {
    const data = await readAll(page);
    setPage(page + 1);
    setTeachers(data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <AdminRoute>
      <Head>
        <title>SET - Teacher Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Manage Teachers</h2>
            <TeacherTable thead={tableHead} data={teachers} isTeacher={true} />
            {teachers?.length >= 10 && (
              <button
                onClick={loadTeachers}
                className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Load 10 More
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default TeacherView;
