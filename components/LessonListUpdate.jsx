import React from "react";
import Avatar from "./util/Avatar";

const LessonListUpdate = ({
  handleRemoveLesson,
  lesson,
  index,
  handleDrag,
  handleDrop,
  setCurrent,
  setVisible,
}) => {
  return (
    <li
      draggable
      onDragStart={(e) => handleDrag(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      className="py-2 mb-2 items-center flex px-4 text-lg gap 4 w-full border justify-between border-gray-200 cursor-pointer"
    >
      <div
        onClick={() => {
          setCurrent(lesson);
          setVisible(true);
        }}
        className="flex items-center gap-4 flex-grow "
      >
        <Avatar index={index} />
        <span>{lesson.title}</span>
      </div>
      <button
        className="text-sm text-red-500 cursor-pointer"
        onClick={(e) => handleRemoveLesson(index)}
      >
        Delete
      </button>
    </li>
  );
};

export default LessonListUpdate;
