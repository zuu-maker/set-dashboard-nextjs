import React from "react";
import { Line } from "rc-progress";

const AddLessonForm = ({
  values,
  handleOnChange,
  uploading,
  handleVideo,
  handleRemoveVideo,
  buttonText,
  progress,
}) => {
  const { title, content } = values;
  return (
    <div className=" text-sm text-gray-500">
      <form className="">
        <input
          onChange={handleOnChange}
          value={title}
          type="text"
          name="title"
          placeholder="Title"
          className="mb-2 block px-1 w-full border-2 border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <textarea
          onChange={handleOnChange}
          value={content}
          name="content"
          rows={8}
          className="mt-1 px-1 block w-full border-2 border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
          placeholder="Content"
        />
        <div className="flex items-center space-x-2">
          <label className="text-white mt-2 flex cursor-pointer justify-center items-center w-full bg-gradient-to-r flex-grow from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-5 py-2.5 text-center">
            {buttonText}
            <input
              hidden
              type="file"
              name="image"
              onChange={handleVideo}
              accept="video/*"
            />
          </label>
          {values.video && values.video.Location && (
            <div>
              <button
                disabled={uploading}
                onClick={handleRemoveVideo}
                className="py-1 text-xs mt-2 font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
              >
                Remove Video
              </button>
            </div>
          )}
        </div>

        <div className="mt-2">
          {progress > 0 && (
            <Line percent={progress} strokeWidth={4} strokeColor="#0000FF" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
