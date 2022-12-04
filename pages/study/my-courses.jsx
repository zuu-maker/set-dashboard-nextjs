import React from "react";
import Head from "next/head";
import AdminNav from "../../components/AdminNav";
import { useEffect, useState } from "react";
import { readMyEnrolledCourses } from "../../lib/student";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state);
  const router = useRouter();

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const loadData = async (id) => {
    const _data = await readMyEnrolledCourses(id);
    console.log(_data);
    setData(_data.courses);
  };

  useEffect(() => {
    if (user && user.id) {
      loadData(user.id);
      setShow(user.isVerified);
    }
  }, [user]);

  return (
    <div className="">
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
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {data?.map((item) => (
                  <div key={item._id} className="group">
                    <div className="bg-gray-50 shadow-lg pb-2">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidde bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={item?.course?.image?.Location}
                          className=" w-full object-cover h-48 object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className=" px-2">
                        <h3 className="mt-4 font-medium text-md text-gray-700">
                          {item?.course?.name}
                        </h3>
                      </div>
                      <div className="px-2">
                        <p className=" text-sm text-gray-600">
                          {item?.course?.start?.split("T")[0]} -{" "}
                          {item?.course?.end?.split("T")[0]}
                        </p>
                      </div>
                      <div className="flex p-2 justify-center items-center">
                        {item.course.subscribed ? (
                          <button
                            onClick={() =>
                              router.push(
                                `/study/my-course/${item?.course?.slug}`
                              )
                            }
                            className="text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Enter Course
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              alert(
                                "Your account subscription has expired, Please go to the enrolled courses tab on your app and proceed to renew your course subscription"
                              )
                            }
                            className="text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Course Subscription Exxpired
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h4 className="text-lg">
                  Please verify email{" "}
                  <span className="text-cyan-600 font-semibold underline ">
                    {user && user.email}
                  </span>
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
