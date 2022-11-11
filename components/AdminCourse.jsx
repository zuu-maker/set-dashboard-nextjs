import React from "react";
import Link from "next/link";

const AdminCourse = ({ course }) => {
  return (
    <li className="pb-2 pt-2 sm:pb-4 w-full">
      <Link href={`/course/${course.slug}`}>
        <div className="flex w-full items-center justify-between cursor-pointer">
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

          <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
            {course.price.toLocaleString("en-US", {
              style: "currency",
              currency: "ZMK",
            })}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default AdminCourse;
