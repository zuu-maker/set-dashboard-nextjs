import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import StudentTable from "../../components/table/Table";
import { readMyStudents } from "../../lib/teacher";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import TeacherRoute from "../../components/routes/TeacherRoute";

const tableHead = [
  "Name",
  "Email",
  "Enrolled Courses",
  "DOB",
  "Phone",
  "City",
  "Actions",
];

const MyStudents = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [data, setData] = useState(null);

  const loadStudents = async (id) => {
    const _data = await readMyStudents(id);
    setData(_data);
  };

  useEffect(() => {
    if (courseId.length > 0) {
      loadStudents(courseId);
    }
  }, [courseId]);

  return (
    <TeacherRoute>
      <Head>
        <title>SET - My Students</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">
              {data?.name}'s' Students
            </h2>
            <StudentTable
              thead={tableHead}
              data={data?.students}
              isStudent={true}
            />
          </div>
        </div>
      </div>
    </TeacherRoute>
  );
};

export default MyStudents;
