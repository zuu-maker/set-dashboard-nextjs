import React from "react";
import Head from "next/head";
import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import { readMyEnrolledCourses } from "../lib/student";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import StudentRoute from "../components/routes/StudentRoute";
import CourseCard from "../components/CourseCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const Home = () => {
  const { user } = useSelector((state) => state);
  const router = useRouter();

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const loadData = async (id) => {
    const _data = await readMyEnrolledCourses(id);

    setData(_data.courses);
  };

  const handlePush = async (courseId) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-info`,
        {
          userId: user.id,
          courseId: courseId,
        }
      );

      if (data.ok) {
        router.push(`/payment/${data.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("can not create payment token");
    }
  };

  useEffect(() => {
    if (user && user.id) {
      loadData(user.id);
      setShow(user.isVerified);
    }
  }, [user]);

  return (
    <StudentRoute>
      <Head>
        <title>SET - Enrolled Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="">
          <div className="container mx-auto p-8">
            <h2 className="text-2xl text-cyan-500 font-semibold mb-3">
              Enrolled Courses
            </h2>
            {show ? (
              <div>
                {data && data.length > 0 ? (
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {data?.map((item) => (
                      <CourseCard
                        key={item._id}
                        item={item}
                        handlePush={handlePush}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-lg ">
                    You are not enrolled into any of our courses{" "}
                    <a
                      className="inline-flex items-center font-medium text-blue-600 hover:underline "
                      href="https://set.edu.zm/browse"
                      target="_blank"
                    >
                      click here
                    </a>{" "}
                    to enroll.{" "}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-lg">
                  Please verify email{" "}
                  <span className="text-cyan-600 font-semibold underline ">
                    {user && user.email}
                  </span>
                  , please check your spam folder and any other related folders.
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentRoute>
  );
};

export default Home;
