import React, { useState } from "react";
import Head from "next/head";
import Resizer from "react-image-file-resizer";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import CreateCourseForm from "../../components/CreateCourseForm";
import { createCourse, removeImage, uploadImage } from "../../lib/course";
import AdminRoute from "../../components/routes/AdminRoute";
/* 
  1.finish image upload - done
  2.push to aws - done
  3.make sure the values are ok
  4.save to the databse
*/

const initialImage = {
  ETag: "",
  Location: "",
  Key: "",
  Key: "",
  Bucket: "",
};

const initialValues = {
  name: "",
  category: "",
  description: "",
  price: "",
  duration: "",
  start: "",
  end: "",
  teacher: "",
  uploading: false,
  loading: false,
  image: initialImage,
};

const CreateCourse = () => {
  const [preview, setPreview] = useState("");
  const [buttonText, setButtonText] = useState("Upload Image");

  const [image, setImage] = useState(initialImage);
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async () => {
    console.log(values, "image ==>", image);

    if (!image?.data?.Location) {
      alert("please uplaod an image!!");
      return;
    }

    createCourse(values, image)
      .then((res) => {
        setValues(initialValues);
        setImage(initialImage);
        setPreview("");
        setButtonText("Upload Image");
        alert("course created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (e) => {
    setValues({ ...values, uploading: true });
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));
    setButtonText(file.name);

    console.log(preview);

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      uploadImage(uri)
        .then((data) => {
          setImage(data);
          console.log("response from image upload==>", data);
          setValues({ ...values, uploading: false });
        })
        .catch((err) => {
          console.log(err);
          alert("upload failed");
          setValues({ ...values, loading: false });
        });
    });
  };

  const handleRemove = async () => {
    setValues({ ...values, uploading: true });
    removeImage(image)
      .then(() => {
        setImage({});
        setPreview("");
        setButtonText("Upload Another Image");
        setValues({ ...values, uploading: false });
      })
      .catch((error) => {
        setValues({ ...values, uploading: false });
        alert("failed to delete");
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <AdminRoute>
      <Head>
        <title>SET - Create Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Create Course</h2>
            <CreateCourseForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              preview={preview}
              buttonText={buttonText}
              handleRemove={handleRemove}
              image={image}
            />
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default CreateCourse;
