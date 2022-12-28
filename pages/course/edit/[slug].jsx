import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/router";
import CreateCourseForm from "../../../components/CreateCourseForm";
import { readCourse } from "../../../lib/course";
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

const initalState = {
  _id: "",
  free_preview: false,
  title: "",
  content: "",
  slug: "",
  video: {},
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

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(initalState);

  const [image, setImage] = useState(imageInitialState);

  const [pdf, setPdf] = useState({
    ETag: "",
    Location: "",
    Key: "",
    Key: "",
    Bucket: "",
  });

  const [values, setValues] = useState();

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

  const handleDrag = (index) => {
    console.log("being dragged ==> ", index);
  };

  const handleDrop = (e, index) => {};

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setValues({ ...values, uploading: true });
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));
    setButtonText(file.name);

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      uploadImage(uri)
        .then((data) => {
          setImage(data);
          setValues((prev) => ({ ...prev, image: data }));
          console.log("response from image upload ==>", data);
          setValues({ ...values, uploading: false });
        })
        .catch((err) => {
          console.log(err);
          setValues({ ...values, loading: false });
        });
    });
  };

  // new code
  const removeLesson = async (index) => {
    let answer = window.confirm("Are you sure you want to delete the lesson?");
    if (!answer) return;

    let _lessons = values.lessons;
    let remove = _lessons.splice(index, 1);
    setValues((prev) => ({ ...prev, lessons: _lessons }));

    if (remove && remove[0].video && remove[0].video.Location) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-video`,
        {
          video: remove[0].video,
        }
      );

      if (res.statusText !== "OK") {
        alert("Error handling video");
        console.log(res);
        return;
      }
      console.log("Deleted Video Res ==>", res);
    }

    removeLessonFromDb(slug, remove)
      .then((res) => {
        console.log("Lesson delete ==>", res);
      })
      .catch((error) => {
        console.log(error);
        alert("error failed to delete");
      });
  };

  const handleSubmit = () => {
    updateCourse(values, image, slug)
      .then(() => {
        alert("Course Update Successful");
        router.push("/course");
      })
      .catch((error) => {
        console.log(error);
        alert("failed to update");
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
        alert("failed to delete");
        console.log(error);
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
                  />
                ))}
              </ul>
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
