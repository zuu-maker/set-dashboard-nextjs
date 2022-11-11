import React from "react";
import Head from "next/head";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminCourse from "../../components/AdminCourse";
import { readCourses } from "../../lib/course";

const CourseIndex = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

  const loadMyCourses = async () => {
    if (user && user.id) {
      const _courses = await readCourses();
      setCourses(_courses);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  return (
    <div>
      <Head>
        <title>SET - All Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 w-full">
            <div className="p-8">
              <h2 className="text-2xl font-semibold">All Courses</h2>

              <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-700">
                {courses &&
                  courses.map((c) => <AdminCourse key={c._id} course={c} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIndex;
