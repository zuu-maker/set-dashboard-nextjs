import React from "react";
import Head from "next/head";
import AdminNav from "../components/AdminNav";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminCourse from "../components/AdminCourse";
import { readCourses } from "../lib/course";
import Loader from "../components/util/Loader";
import AuthCheck from "../components/auth/AuthCheck";

const AllCourses = () => {
  const user = useSelector((state) => state.user);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMyCourses = async () => {
    if (user && user.id) {
      const _courses = await readCourses(user.id);
      setMyCourses(_courses);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadMyCourses();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>SET - All Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 w-full">
            <div className="p-8">
              <h2 className="text-2xl font-semibold">All Courses</h2>

              {loading ? (
                <Loader />
              ) : (
                <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-700">
                  {myCourses &&
                    myCourses.map((c) => (
                      <AdminCourse key={c._id} course={c} />
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllCourses;
