import axios from "axios";

const createCourse = async (values, image) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-course`,
    {
      ...values,
      image,
    }
  );
};

const publishToDb = async (courseId) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/publish/${courseId}`
  );
};

const unPublishFromDb = async (courseId) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/unpublish/${courseId}`
  );
};

const updateCourse = async (values, image, slug) => {
  if (image && image.Key && image.Location) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${slug}`,
      {
        ...values,
        image,
      }
    );
  }

  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${slug}`,
    {
      ...values,
    }
  );
};

const uploadImage = async (uri) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-image`,
    {
      image: uri,
    }
  );
};

const removeImage = async (image) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-image`,
    image
  );
};

const readCourses = async (userId) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}//my-courses/${userId}`
  );

  return data;
};

const readCourse = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-course/${slug}`
  );
  return data;
};

//total count
const studentCountFromDb = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/student-count/${id}`
  );
  return res.data;
};

export {
  readCourse,
  readCourses,
  createCourse,
  uploadImage,
  removeImage,
  updateCourse,
  unPublishFromDb,
  publishToDb,
  studentCountFromDb,
};
