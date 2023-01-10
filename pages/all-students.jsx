import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import StudentTable from "../components/table/Table";
import { useEffect, useState } from "react";
import { readStudents } from "../lib/student";
import AdminNav from "../components/AdminNav";
import AdminRoute from "../components/routes/AdminRoute";

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
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  const loadStudents = async () => {
    const _students = await readStudents(page);
    setPage(page + 1);
    setStudents(_students);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <AdminRoute className="">
      <Head>
        <title>SET - All Students</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">All Students</h2>
            <StudentTable thead={tableHead} data={students} isStudent={true} />
            {students?.length >= 25 && (
              <button
                onClick={loadStudents}
                className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Load 25 More
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default StudentView;
