import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import StudentRole from "../../components/table/StudentRole";
import { useEffect } from "react";
import { readSubs } from "../../lib/student";
import AdminNav from "../../components/AdminNav";

const allStudents = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const loadSubs = async () => {
    const _subs = await readSubs();
    console.log(_subs);
    setSubscriptions(_subs);
  };

  useEffect(() => {
    loadSubs();
  }, []);
  return (
    <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default allStudents;
