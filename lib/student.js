import axios from "axios";

const readStudents = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-students`
  );

  return data;
};

const totalStudents = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/total-students`
  );

  return data;
};

const readSubs = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/student-subscriptions`
  );

  return data;
};

export { readStudents, totalStudents, readSubs };
