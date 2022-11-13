import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import AdminNav from "../../../components/AdminNav";
import { useEffect, useState } from "react";
import { readCourse } from "../../../lib/course";
import LessonListStudent from "../../../components/LessonListStudent";

const MyCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);

  const loadCourse = async () => {
    const _course = await readCourse(slug);
    console.log(_course);
    setCourse(_course);
  };

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

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
            <div className="shadow-md p-4 bg-gray-50">
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
            <hr></hr>
            <div>
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
