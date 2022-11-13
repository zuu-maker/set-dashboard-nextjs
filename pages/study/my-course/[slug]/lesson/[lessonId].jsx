import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AdminNav from "../../../../../components/AdminNav";
import Head from "next/head";
import { readLesson } from "../../../../../lib/lesson";
import ReactPlayer from "react-player";

const LessonView = () => {
  const router = useRouter();
  const { lessonId, slug } = router.query;

  const [lesson, setLesson] = useState(null);

  const loadLesson = async () => {
    const _lesson = await readLesson(slug, lessonId);
    console.log(_lesson);
    setLesson(_lesson);
  };

  useEffect(() => {
    if (slug && lessonId) loadLesson();
  }, [lessonId, slug]);
  return (
    <div>
      <Head>
        <title>SET - Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="">
          <div className="container mx-auto px-8 pt-8 pb-16">
            <div className="flex justify-center items-center mb-4">
              {lesson && lesson.video && lesson.video.Location && (
                <ReactPlayer
                  url={lesson.video.Location}
                  width="85%"
                  height="68vh"
                  controls
                />
              )}
            </div>
            <div className="flex items-center justify-between ">
              <h2 className="text-2xl text-cyan-700 font-bold mb-3">
                {lesson?.title}
              </h2>
              {lesson && lesson.pdf && lesson.pdf.Location && (
                <a
                  target="_blank"
                  href={lesson.pdf.Location}
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
            <div className="mt-4">
              <p className="text-lg mb-3 font-light text-gray-500 ">
                {lesson?.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
