import axios from "axios";

const createCourse = async (values, image) => {
  console.log(image, values);
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

const removeImageFromEdit = async (image) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-image/edit`,
    image
  );
};

const readCourses = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/all-courses`
  );

  return data;
};

const readCourse = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-course/${slug}`
  );
  return data;
};

const readMyCourse = async (slug, id) => {
  console.log(id);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-enrolled-course/${slug}/${id}`
  );
  return data;
};

//mine
const readMyCourses = async (userId) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-courses/${userId}`
  );

  return data;
};

const readWithTeachers = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-course-teacher`
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

const totalCoursesFromDb = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/total-courses`
  );
  return res.data;
};

const totalPublishedFromDb = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/total-published-courses`
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
  readMyCourses,
  readMyCourse,
  readWithTeachers,
  totalCoursesFromDb,
  totalPublishedFromDb,
  removeImageFromEdit,
};
