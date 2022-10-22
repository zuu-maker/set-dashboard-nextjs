import React from "react";
import Link from "next/link";
import Avatar from "./util/Avatar";

const LessonList = ({ lesson, index }) => {
  return (
    // <Link href={`/teacher/course/lessoon/${lesson.slug}`}>
    <li className="py-2 mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200 cursor-pointer">
      <div className="flex items-center gap-4">
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
    </li>
    // </Link>
  );
};

export default LessonList;
