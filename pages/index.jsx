import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import StatsCard from "../components/StatsCard";
import Group from "../components/util/Group";
import TeacherIcon from "../components/util/TeachersIcon";
import CourseIcon from "../components/util/CourseIcon";
import TransactionTable from "../components/table/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADMIN } from "../features/userSlice";
import { useRouter } from "next/router";
import { totalCoursesFromDb, totalPublishedFromDb } from "../lib/course";
import { totalStudents } from "../lib/student";
import { totalTeachers } from "../lib/teacher";
import { readOrders } from "../lib/order";
import Loader from "../components/util/Loader";

const tableHead = [
  "Name",
  "Courses Enrolled",
  "Phone",
  "Email",
  "City",
  "Date",
  "(K) Amount",
  "Status",
];

const Home = () => {
  const { user } = useSelector((state) => state);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [data, setData] = useState({
    teachers: 0,
    students: 0,
    totalCourses: 0,
    totalPublishedCourses: 0,
  });

  const loadData = async () => {
    const tc = await totalCoursesFromDb();
    const tpc = await totalPublishedFromDb();
    const ts = await totalStudents();
    const tt = await totalTeachers();

    const orders = await readOrders();
    setOrders(orders);

    setData((prev) => ({
      ...prev,
      teachers: tt,
      students: ts,
      totalCourses: tc,
      totalPublishedCourses: tpc,
    }));
  };

  useEffect(() => {
    setLoading(true);
    if (user && user.role === "Teacher") {
      router.push(`courses/${user.id}`);
    } else if (user && user.role === "Student") {
      router.push("study/my-courses");
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && user.role === ADMIN) {
      loadData();
    }
    setLoading(false);
  }, [user]);

  return (
    <div>
      <Head>
        <title>Set - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6 ">
            <Sidebar />{" "}
          </div>
          {loading ? (
            <div className="basis-5/6 -ml-10 p-8">
              <Loader />
            </div>
          ) : (
            <div className="basis-5/6 -ml-10 p-8">
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Number Of Students"
                  stat={data.students}
                  Icon={Group}
                />
                <StatsCard
                  title="Number Of Teachers"
                  stat={data.teachers}
                  Icon={TeacherIcon}
                />
                <StatsCard
                  title="Number Of Courses"
                  stat={data.totalCourses}
                  Icon={CourseIcon}
                />
                <StatsCard
                  title="Number Of published Courses"
                  stat={data.totalPublishedCourses}
                  Icon={CourseIcon}
                />
              </div>

              <div>
                <div className="md:col-span-2 pt-5 xl:col-span-3">
                  <h3 className="text-xl font-semibold">
                    50 of the recent Transactions
                  </h3>
                  <div className="w-full">
                    {orders && orders.length > 0 && (
                      <TransactionTable
                        thead={tableHead}
                        data={orders}
                        isDash={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
