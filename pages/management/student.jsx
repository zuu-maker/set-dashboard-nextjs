import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import StudentRole from "../../components/table/StudentRole";
import { useEffect } from "react";
import { readSubs } from "../../lib/student";
import AdminNav from "../../components/AdminNav";
import AdminRoute from "../../components/routes/AdminRoute";
import { CSVLink } from "react-csv";
import axios from "axios";

const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "City", key: "city" },
];

const allStudents = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const loadSubs = async () => {
    const _subs = await readSubs(page);
    setPage(page + 1);
    setSubscriptions(_subs);
  };

  useEffect(() => {
    loadSubs();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/not-subscribed`
      );
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("failed to get users");
    }
  };

  return (
    <AdminRoute>
      <Head>
        <title>SET - All Students </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 p-8">
            <h2 className="text-2xl font-semibold mb-3">
              All Students Subscriptions
            </h2>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {subscriptions &&
                    subscriptions.length > 0 &&
                    subscriptions.map((item, index) => {
                      if (item?.courses?.length > 1) {
                        return item.courses.map((c, ind) => (
                          <StudentRole
                            key={ind}
                            id={c._id}
                            phone={item.phone}
                            name={item.name}
                            student={c}
                            i={index}
                          />
                        ));
                      } else if (
                        item &&
                        item.courses &&
                        item.courses.length === 1
                      ) {
                        return (
                          <StudentRole
                            id={item.courses[0]._id}
                            key={item._id}
                            phone={item.phone}
                            name={item.name}
                            student={item.courses[0]}
                            i={index}
                          />
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between w-full px-5">
              {data.length > 0 ? (
                <CSVLink
                  filename={"not-subscribed.csv"}
                  headers={headers}
                  data={data}
                  className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  Download Data
                </CSVLink>
              ) : (
                <button
                  onClick={getData}
                  className="text-white h-12 w-32 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="mr-2 w-8 h-6 text-gray-200 animate-spin fill-cyan-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-base">Get Data</span>
                  )}
                </button>
              )}
              {subscriptions?.length >= 20 && (
                <button
                  onClick={loadSubs}
                  className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  Load 20 More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default allStudents;
