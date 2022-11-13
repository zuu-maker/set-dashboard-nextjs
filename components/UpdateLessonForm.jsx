import React from "react";
import ReactPlayer from "react-player";
import { Line } from "rc-progress";

const UpdateLessonForm = ({
  current,
  handleOnChange,
  uploading,
  handleVideo,
  buttonText,
  buttonTextPdf,
  progress,
  handlePdf,
}) => {
  const { title, content, pdf } = current;
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
        <div className="flex flex-col items-center gap-5 mt-3">
          {!uploading && current?.video && current.video.Location && (
            <ReactPlayer
              url={current.video.Location}
              width="410px"
              height="240px"
              controls
            />
          )}

          <label className="text-white  flex cursor-pointer justify-center items-center w-full bg-gradient-to-r flex-grow from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-5 py-2.5 text-center">
            {buttonText}
            <input
              hidden
              type="file"
              name="image"
              onChange={handleVideo}
              accept="video/*"
            />
          </label>
        </div>

        <div className="mt-2">
          {progress > 0 && (
            <Line percent={progress} strokeWidth={4} strokeColor="#0000FF" />
          )}
        </div>
        <div className="flex px-3 justify-between items-center">
          <a
            className="font-md flex-grow text-lg text-cyan-600 dark:text-cyan-500 hover:underline"
            target="_blank"
            href={pdf?.Location}
            rel="noopener noreferrer"
          >
            link to pdf
          </a>
          <label className="text-white mt-2 flex cursor-pointer justify-center items-center  bg-gradient-to-r f from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-5 py-2.5 text-center">
            {buttonTextPdf}
            <input
              hidden
              type="file"
              onChange={handlePdf}
              accept="application/pdf"
            />
          </label>
          {/* <button onClick={handlePdf} className="text-white  flex cursor-pointer justify-center items-center  bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium text-sm px-5 py-2.5 text-center">
            {buttonTextPdf}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
