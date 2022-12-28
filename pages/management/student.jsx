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
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/not-subscribed`
      );
      setData(data);
      console.log(data);
    } catch (error) {
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
                  className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  Get Data
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
