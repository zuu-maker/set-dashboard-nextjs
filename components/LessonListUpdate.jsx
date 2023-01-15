import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import Avatar from "./util/Avatar";

const LessonListUpdate = ({
  handleRemoveLesson,
  lesson,
  index,
  handleDrag,
  handleDrop,
  setCurrent,
  setVisible,
  slug,
}) => {
  async function publishLesson(id) {
    let answer = window.confirm(
      "Are you sure? the lesson will  be avalible for viewing?"
    );
    if (!answer) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/publish/${slug}/lesson/${id}`,
        lesson
      );
      toast.success("lesson published");
    } catch (error) {
      toast.error("error publishing");
      console.log(error);
    }
  }

  async function unPublishLesson(id) {
    let answer = window.confirm(
      "Are you sure? the lesson will not be avalible for viewing?"
    );
    if (!answer) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/un-publish/${slug}/lesson/${id}`,
        lesson
      );
      toast.success("lesson un-published");
    } catch (error) {
      toast.error("error un-publishing");
      console.log(error);
    }
  }

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
      <div className="flex items-center space-x-4">
        {lesson.published ? (
          <button
            className="text-sm text-yellow-500 cursor-pointer hover:scale-110 "
            onClick={() => unPublishLesson(lesson._id)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="text-sm text-green-500 cursor-pointer hover:scale-110 "
            onClick={() => publishLesson(lesson._id)}
          >
            Publish
          </button>
        )}
        <button
          className="text-sm text-red-500 cursor-pointer hover:scale-110"
          onClick={(e) => handleRemoveLesson(index)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default LessonListUpdate;
