import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import StudentTable from "../components/table/Table";
import { useEffect, useState } from "react";
import { readStudents } from "../lib/student";

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

  const loadStudents = async () => {
    const _students = await readStudents();
    setStudents(_students);
  };

  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <div className="">
      <Head>
        <title>SET - All Students</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">All Students</h2>
            <StudentTable thead={tableHead} data={students} isStudent={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
