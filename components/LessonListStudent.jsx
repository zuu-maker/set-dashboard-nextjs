import React from "react";
import Avatar from "./util/Avatar";

const LessonListStudent = ({ lesson, index, setCurrent }) => {
  return (
    <li
      onClick={() => setCurrent(lesson)}
      className="py-2 cursor-pointer mb-2 items-center flex px-4 text-lg w-full border justify-between border-gray-200"
    >
      <div className="flex items-center gap-4">
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
    </li>
  );
};

export default LessonListStudent;
