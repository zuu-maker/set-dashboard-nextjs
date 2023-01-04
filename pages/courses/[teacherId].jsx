import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { readMyCourses } from "../../lib/teacher";
import Loader from "../../components/util/Loader";
import TeacherCourse from "../../components/TeacherCourse";
import TeacherRoute from "../../components/routes/TeacherRoute";

const CourseViewTeacher = () => {
  const { user } = useSelector((state) => state);
  const router = useRouter();

  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const { teacherId } = router.query;

  const loadMyCourses = async () => {
    if (teacherId) {
      const _courses = await readMyCourses(teacherId);
      setMyCourses(_courses);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      setShow(user.isVerified);
      console.log("is verified -->", user.isVerified);
      loadMyCourses();
    }
  }, [user]);

  return (
    <TeacherRoute>
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
                  {show ? (
                    <div>
                      {myCourses && myCourses.length < 1 ? (
                        <p className="text-red-400">No Assigned Courses</p>
                      ) : (
                        <ul className="divide-y mt-4 divide-gray-200 dark:divide-gray-700">
                          {myCourses.length > 0 &&
                            myCourses.map((c) => (
                              <TeacherCourse key={c._id} course={c} />
                            ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg">
                        Please verify email{" "}
                        <span className="text-cyan-600 font-semibold underline ">
                          {user && user.email}
                        </span>
                        , please check your spam folder and any other related
                        folders.
                      </h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TeacherRoute>
  );
};

export default CourseViewTeacher;
