import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/router";
import CreateCourseForm from "../../../components/CreateCourseForm";
import { readCourse, updateLessons } from "../../../lib/course";
import {
  updateCourse,
  uploadImage,
  removeImageFromEdit,
} from "../../../lib/course";
import LessonListUpdate from "../../../components/LessonListUpdate";
import { removeLessonFromDb } from "../../../lib/lesson";
import UpdateModal from "../../../components/UpdateModal";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

import { ADMIN } from "../../../features/userSlice";
import AdminAndTeacher from "../../../components/routes/AdminAndTeacher";
import { toast } from "react-hot-toast";

const initalState = {
  _id: "",
  free_preview: false,
  title: "",
  content: "",
  slug: "",
  video: {},
  pdf: {},
};

const imageInitialState = {
  ETag: "",
  Location: "",
  Key: "",
  Key: "",
  Bucket: "",
};

const EditCourse = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state);
  const { slug } = router.query;
  const [preview, setPreview] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");
  const [category, setCategory] = useState("");
  const [isRearranged, setIsRearranged] = useState(false);

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(initalState);

  const [image, setImage] = useState(imageInitialState);

  const [values, setValues] = useState(null);

  const loadCourse = async () => {
    if (slug) {
      const _course = await readCourse(slug);
      setValues(_course);
      setCategory(_course?.category?._id);
    }
  };

  useEffect(() => {
    if (values && values.category?.name) {
      setValues({ ...values, category: category });
    }
  }, [values]);

  useEffect(() => {
    if (slug) loadCourse(slug);
  }, [slug]);

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = (e, index) => {
    const movingIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let lessons = values.lessons;

    let movingItem = lessons[movingIndex];
    lessons.splice(movingIndex, 1);
    lessons.splice(targetItemIndex, 0, movingItem);

    setValues((prev) => ({ ...prev, lessons: [...lessons] }));
    setIsRearranged(true);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setButtonText("working on it...");

    if (values && values.image && values.image.Location) {
      removeImageFromEdit(values.image)
        .then(() => {
          setValues({ ...values, image: imageInitialState });
          setButtonText("Upload Another Image");
        })
        .catch((error) => {
          setButtonText("Try again");
          toast.error("failed to delete");
          console.log(error);
          return;
        });
    }

    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      uploadImage(uri)
        .then((res) => {
          setImage(res);
          setValues((prev) => ({ ...prev, image: res.data }));
          setButtonText(file.name);
          console.log("response from image upload ==>", res.data);
          toast.success("Image uploaded successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to upload image");
          setButtonText("Try again");
        });
    });
  };

  // new code
  const removeLesson = async (index) => {
    //confirm boolean
    let answer = window.confirm("Are you sure you want to delete the lesson?");
    if (!answer) return;

    //declerations and state management
    const toastId = toast.loading("Adding teacher...");
    let _lessons = values.lessons;
    let remove = _lessons.splice(index, 1);
    setValues((prev) => ({ ...prev, lessons: _lessons }));

    //remove video
    if (remove && remove[0].video && remove[0].video.Location) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-video`,
        {
          video: remove[0].video,
        }
      );

      if (res.statusText !== "OK") {
        toast.error("Error deleting video");
        console.log(res);
        return;
      }
    }

    //remove pdf
    if (remove && remove[0].pdf && remove[0].pdf.Location) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-pdf`,
          {
            pdf: remove[0].pdf,
          }
        );

        if (res.statusText !== "OK") {
          toast.error("Error deleting PDF");
          console.log(res);
          return;
        }
        console.log("Deleted Video Res ==>", res);
      } catch (error) {
        toast.error("Error deleting Pdf");
        console.log(error);
        return;
      }
    }

    //remove data from db
    removeLessonFromDb(slug, remove)
      .then((res) => {
        toast.dismiss(toastId);

        return res;
      })
      .then((res) => {
        console.log("Lesson delete ==>", res);
        toast.success("lesson deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error failed to delete");
      });
  };

  const handleSubmit = () => {
    updateCourse(values, image, slug)
      .then(() => {
        toast.success("Course Update Successful");
        router.push("/course");
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed to update");
      });
  };

  const handleRemove = async () => {
    console.log(values.image);

    setValues({ ...values, uploading: true });
    removeImageFromEdit(values.image)
      .then(() => {
        setValues({ ...values, image: imageInitialState });
        setButtonText("Upload Another Image");
        setValues({ ...values, uploading: false });
      })
      .catch((error) => {
        setValues({ ...values, uploading: false });
        toast.error("failed to delete");
        console.log(error);
      });
  };

  const saveRearrangement = async () => {
    updateLessons(values.lessons, slug)
      .then(() => {
        toast.success("Course Update Successful");
        setIsRearranged(false);
      })
      .catch(() => {
        console.log(error);
        toast.error("failed to update");
      });
  };

  return (
    <AdminAndTeacher>
      <Head>
        <title>SET - Update Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl mb-2 font-semibold">
              {user && user.role === ADMIN ? "Edit Course" : "Edit Lessons"}
            </h2>
            {user && user.role === ADMIN && (
              <CreateCourseForm
                handleImage={handleImage}
                handleChange={handleChange}
                buttonText={buttonText}
                setButtonText={setButtonText}
                preview={preview}
                setPreview={setPreview}
                image={image}
                values={values}
                editPage={true}
                handleRemove={handleRemove}
                handleSubmit={handleSubmit}
              />
            )}
            <hr className="mt-8" />
            <div>
              <h4 className="text-xl mb-2 mt-2 font-semibold text-cyan-400">
                {values?.lessons?.length > 0
                  ? values.lessons.length + " Lesson(s)"
                  : 0 + " Lessons"}
              </h4>
              <ul
                className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg"
                onDragOver={(e) => e.preventDefault()}
              >
                {values?.lessons?.map((item, i) => (
                  <LessonListUpdate
                    key={i}
                    setCurrent={setCurrent}
                    setVisible={setVisible}
                    handleRemoveLesson={removeLesson}
                    handleDrop={handleDrop}
                    handleDrag={handleDrag}
                    lesson={item}
                    index={i}
                    slug={slug}
                  />
                ))}
              </ul>
              <button
                onClick={saveRearrangement}
                disabled={!isRearranged}
                className="text-white w-36 disabled:opacity-70  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Save
              </button>
              <UpdateModal
                values={values}
                current={current}
                visible={visible}
                setVisible={setVisible}
                setCurrent={setCurrent}
                slug={slug}
                setValues={setValues}
                initalState={initalState}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminAndTeacher>
  );
};

export default EditCourse;
