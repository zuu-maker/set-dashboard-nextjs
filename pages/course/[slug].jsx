import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import LessonList from "../../components/LessonList";
import Avatar from "../../components/util/Avatar";
import {
  publishToDb,
  readCourse,
  studentCountFromDb,
  unPublishFromDb,
} from "../../lib/course";
import Loader from "../../components/util/Loader";
import { useSelector } from "react-redux";

import { TEACHER, ADMIN } from "../../features/userSlice";
import AdminRoute from "../../components/routes/AdminRoute";

const CourseView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useSelector((state) => state);
  //for lessons
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState(null);

  const loadCourse = async () => {
    if (slug) {
      const _course = await readCourse(slug);
      setCourse(_course);
      studentCount(_course._id);
    }
    setLoading(false);
  };

  const studentCount = async (id) => {
    if (id) {
      const _students = await studentCountFromDb(id);
      _students && _students.length
        ? setStudents(_students.length)
        : setStudents(0);
    }
  };

  const publish = (id) => {
    let answer = window.confirm(
      "Once course is published it will be avalible for students to enroll"
    );

    if (!answer) return;
    publishToDb(course._id)
      .then((res) => {
        setCourse(res.data);
        alert("Course is now live!!");
      })
      .catch((error) => {
        console.log(error);
        alert("Oops failed to publish");
      });
    console.log(id);
  };

  const unPublish = (id) => {
    let answer = window.confirm(
      "Once course is unpublished it will not be avalible for students to enroll"
    );

    if (!answer) return;
    unPublishFromDb(course._id)
      .then((res) => {
        setCourse(res.data);
        alert("Course has been successfully unpublished");
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry failed to unpublished");
      });
    console.log(id);
  };

  useEffect(() => {
    setLoading(true);
    loadCourse();
  }, [slug]);

  return (
    <AdminRoute>
      <Head>
        <title>SET - Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>

          <div className="basis-5/6 p-8 -ml-10">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center">
                      <Avatar src={course?.image?.Location} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-cyan-400">
                        {course?.name}
                      </h3>
                      <p className="text-lg">
                        {course && course.lessons && course.lessons.length}{" "}
                        lesson(s)
                      </p>
                      <p className="text-md font-light ">
                        {course && course.category && course.category.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col items-center space-x-4">
                      <div className="flex items-center space-x-4">
                        <p
                          className="cursor-pointer text-emerald-500 text-lg font-semibold hover:underline"
                          onClick={() => router.push(`/course/edit/${slug}`)}
                        >
                          Edit
                        </p>
                        {user && user.role === ADMIN && (
                          <div>
                            {course && course.published ? (
                              <button
                                onClick={() => unPublish(course._id)}
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
                              >
                                Unpublish
                              </button>
                            ) : (
                              <button
                                onClick={() => publish(course._id)}
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-md text-cyan-700">
                          Number of students enrolled: {students}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  {/* <ReactMarkdown source={course.description} /> */}
                  <p className="text-xs">{course?.description}</p>
                </div>
                {user && user.role === TEACHER && (
                  <div className="flex w-full justify-center mb-2">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
                      onClick={() => setVisible(!visible)}
                    >
                      Add Lesson
                    </button>
                  </div>
                )}
                <hr />
                <div>
                  <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                    {course?.lessons?.length > 0
                      ? course.lessons.length + " Lesson(s)"
                      : 0 + " Lessons"}
                  </h4>
                  <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
                    {course?.lessons?.map((item, i) => (
                      <LessonList key={i} lesson={item} index={i} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="p-8 w-full">
              <Modal
                setCourse={setCourse}
                visible={visible}
                setVisible={setVisible}
                slug={slug}
                loadCourse={loadCourse}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default CourseView;
