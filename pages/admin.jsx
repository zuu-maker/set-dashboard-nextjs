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
import { readOrders } from "../lib/order";
import Loader from "../components/util/Loader";
import AdminRoute from "../components/routes/AdminRoute";
import ChartData from "../components/ChartData";
import axios from "axios";

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

const Admin = () => {
  const { user } = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [bar, setBar] = useState([]);
  const [data, setData] = useState({
    teachers: 0,
    students: 0,
    totalCourses: 0,
    totalPublishedCourses: 0,
    pieChartData: [],
  });

  const loadData = async () => {
    axios
      .all([
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/students-total`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers-total`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/total-courses`),
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/total-published-courses`
        ),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/read/bar-chat-data`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/read/pie-chart-data`),
      ])
      .then(
        axios.spread((res1, res2, res3, res4, res5, res6) => {
          setData((prev) => ({
            ...prev,
            students: res1.data,
            teachers: res2.data,
            totalCourses: res3.data,
            totalPublishedCourses: res4.data,
            pieChartData: res6.data,
          }));

          setBar(res5.data);
        })
      );

    const orders = await readOrders(page);
    setOrders(orders);

    setLoading(false);
  };

  useEffect(() => {
    if (user && user.role === ADMIN) {
      loadData();
    }
  }, [user]);

  const loadMore = async () => {
    setPage(page + 1);
    console.log(page);
    const orders = await readOrders(page);
    setOrders(orders);
  };

  return (
    <AdminRoute>
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
                  <h3 className="text-xl font-semibold">Chart Data</h3>
                  <div className="w-full">
                    <ChartData b={bar} data={data} />
                  </div>
                </div>
              </div>

              <div>
                <div className="md:col-span-2 pt-20 xl:col-span-3">
                  <h3 className="text-xl  font-semibold">
                    15 of the recent Transactions
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

              {orders?.length >= 15 && (
                <button
                  onClick={loadMore}
                  className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
