import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import StatsCard from "../components/StatsCard";
import Group from "../components/util/Group";
import TeacherIcon from "../components/util/TeachersIcon";
import CourseIcon from "../components/util/CourseIcon";
import TransactionTable from "../components/table/Table";

const tableHead = [
  "Name",
  "Courses Enrolled",
  "Phone",
  "Email",
  "City",
  "Date",
  "(K) Amount",
];

const Home = () => {
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
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 p-8">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Number Of Students" stat={1234} Icon={Group} />
              <StatsCard
                title="Number Of Teachers"
                stat={34}
                Icon={TeacherIcon}
              />
              <StatsCard
                title="Number Of Courses"
                stat={34}
                Icon={CourseIcon}
              />
              <StatsCard
                title="Number Of published Courses"
                stat={34}
                Icon={CourseIcon}
              />
            </div>

            <div>
              <div className="md:col-span-2 pt-5 xl:col-span-3">
                <h3 className="text-xl font-semibold">
                  A 100 of the recent Transactions
                </h3>
                <div className="w-full">
                  <TransactionTable thead={tableHead} isDash={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
