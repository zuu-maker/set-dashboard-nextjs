import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import AdminCourse from "../../components/AdminCourse";
import { readMyCourses } from "../../lib/teacher";
import Loader from "../../components/util/Loader";

const CourseViewTeacher = () => {
  const router = useRouter();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { teacherId } = router.query;

  const loadMyCourses = async () => {
    if (teacherId) {
      const _courses = await readMyCourses(teacherId);
      console.log("courses ->", _courses);
      setMyCourses(_courses);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadMyCourses();
  }, []);

  return (
    <div>
      <Head>
        <title>SET - My Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 w-full">
            <div className="p-8">
              <h2 className="text-2xl font-semibold">Assigned Courses</h2>

              {loading ? (
                <Loader />
              ) : (
                <div>
                  {myCourses && myCourses.length < 1 ? (
                    <p className="text-red-400">No Assigned Courses</p>
                  ) : (
                    <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-700">
                      {myCourses.length > 0 &&
                        myCourses.map((c) => (
                          <AdminCourse key={c._id} course={c} />
                        ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewTeacher;
