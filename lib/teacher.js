import axios from "axios";

const readTeachers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-teachers`
  );
  return res.data.teachers;
};

const readAll = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-all-teachers`
  );

  return data;
};

const readMyCourses = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-courses/${id}`
  );
  return res.data;
};

const readMyStudents = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-students/${id}`
  );
  return res.data;
};

const totalTeachers = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/total-teachers`
  );

  return data;
};

export { readTeachers, readMyStudents, readAll, totalTeachers, readMyCourses };
