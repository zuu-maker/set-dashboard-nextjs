import React from "react";
import Link from "next/link";
import Avatar from "./util/Avatar";

const LessonListStudent = ({ course, lesson, index }) => {
  return (
    <Link href={`/study/my-course/${course}/lesson/${lesson._id}`}>
      <li className="py-2 cursor-pointer mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200">
        <div className="flex items-center gap-4">
          <Avatar index={index} />
          <span>{lesson.title}</span>
        </div>
      </li>
    </Link>
  );
};

export default LessonListStudent;
