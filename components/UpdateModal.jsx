import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddLessonForm from "./AddLessonForm";
import axios from "axios";
import { addLesssonToDb, updateLessonInDb } from "../lib/lesson";
import UpdateLessonForm from "./UpdateLessonForm";

const UpdateModal = ({
  visible,
  setVisible,
  current,
  setCurrent,
  slug,
  setValues,
  initalState,
  values,
}) => {
  const cancelButtonRef = useRef(null);
  const [buttonText, setButtonText] = useState("Upload Video");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOnChange = (e) => {
    setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateLesson = async () => {
    setUploading(true);
    updateLessonInDb(slug, current)
      .then((res) => {
        console.log("from db after update ==>", res);
        setButtonText("Upload Video");
        alert("Lesson Updated");

        if (res.data.ok) {
          let arr = values.lessons;
          const index = arr.findIndex((item) => item._id === current._id);
          arr[index] = current;
          setValues((prev) => ({ ...prev, lessons: arr }));
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating");
      })
      .finally(() => {
        setUploading(false);
        setVisible(false);
        setCurrent(initalState);
      });
  };

  const handleVideo = async (e) => {
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-video`,
        {
          video: current.video,
        }
      );

      if (res.statusText !== "OK") {
        alert("Error handling video");
        console.log(res);
        return;
      }
      console.log("Deleted Video Res ==>", res);
    }

    const file = e.target.files[0];
    console.log(file);
    setButtonText(file.name);
    setUploading(true);

    const videoData = new FormData();
    videoData.append("video", file);
    console.log(videoData);

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-video`,
      videoData,
      {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      }
    );

    setUploading(false);
    setButtonText("Upload Another Video");
    console.log(data);
    setCurrent((prev) => ({ ...prev, video: data }));
  };

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setVisible}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Update Lesson
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="px-10">
                  <UpdateLessonForm
                    current={current}
                    uploading={uploading}
                    handleOnChange={handleOnChange}
                    handleVideo={handleVideo}
                    buttonText={buttonText}
                    progress={progress}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpdateLesson}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setVisible(false);
                      setButtonText("Upload Video");
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateModal;
