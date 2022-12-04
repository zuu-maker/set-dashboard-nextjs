import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import AdminNav from "../../../components/AdminNav";
import { useEffect, useState } from "react";
import { readMyCourse } from "../../../lib/course";
import LessonListStudent from "../../../components/LessonListStudent";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const MyCourse = () => {
  const { user } = useSelector((state) => state);

  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);
  const [current, setCurrent] = useState(null);

  const loadCourse = async () => {
    const data = await readMyCourse(slug, user.id);
    if (data.ok) {
      setCurrent(data.course?.lessons[0]);
      console.log(data);
      setCourse(data.course);
    }
    console.log("the data ->", data);
  };

  useEffect(() => {
    if (slug && user && user.id) {
      loadCourse();
      console.log(current);
    }
  }, [slug, user]);

  return (
    <div>
      <Head>
        <title>SET - Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="">
          <div className="container mx-auto p-8">
            <h2 className="text-2xl text-cyan-700 font-semibold mb-3">
              You Are Learning <span className="underline">{course?.name}</span>
            </h2>

            <div>
              <div className="flex justify-center items-center mb-4 mt-2">
                <div className="sm:w-5/6 w-full sm:h-5/6 h-60 ">
                  <ReactPlayer
                    url={current?.video?.Location}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <h2 className="text-2xl text-cyan-700 font-bold mb-2">
                  {current?.title}
                </h2>
                {current && current.pdf && current.pdf.Location && (
                  <a
                    target="_blank"
                    href={current.pdf.Location}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                  >
                    View Pdf
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
              <div className="mt-2">
                <p className="text-lg mb-3 font-light text-gray-500 ">
                  {current?.content}
                </p>
              </div>
              <hr className="my-5 "></hr>
              <div className="shadow-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-600">
                        Teacher : {course?.teacher?.name}
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
                    <div className="">
                      <div>
                        <p className="font-semibold text-md text-cyan-700">
                          Duration: {course?.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-md">{course?.description}</p>
                </div>
              </div>
              <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                {course?.lessons?.length > 0
                  ? course.lessons.length + " Lesson(s)"
                  : 0 + " Lessons"}
              </h4>

              <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg">
                {course?.lessons?.map((item, i) => (
                  <LessonListStudent
                    key={i}
                    course={course?.slug}
                    lesson={item}
                    index={i}
                    setCurrent={setCurrent}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
