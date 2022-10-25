import axios from "axios";

const readTeachers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-teachers`
  );
  return res.data.teachers;
};

const readMyCourses = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-courses/${id}`
  );
  return res.data;
};

export { readTeachers, readMyCourses };
