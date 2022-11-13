import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TeacherCourse = ({ course }) => {
  const { user } = useSelector((state) => state);

  const router = useRouter();

  return (
    <li className="pb-2 pt-2 sm:pb-4 w-full">
      <div className="flex w-full items-center justify-between cursor-pointer">
        <Link href={`/course/${course.slug}`}>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-20 h-20 rounded-full"
                src={course.image.Location}
                alt="set course"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-md font-medium text-gray-900 truncate ">
                {course.name}
              </p>
              <p className="text-sm text-gray-500 truncate ">
                {course.lessons.length} lesson(s)
              </p>
            </div>
          </div>
        </Link>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
          <button
            onClick={() => router.push(`/my-students/${course._id}`)}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            View Students
          </button>
        </div>
      </div>
    </li>
  );
};

export default TeacherCourse;
