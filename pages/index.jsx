import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-3">
            <div className="flex items-center justify-between">
              <div>Number of Students</div>
              <div>Number of teachers</div>
              <div>Number of active courses</div>
              <div>number of active courses</div>
            </div>

            <div>maybe some graphs</div>

            <div>table of orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
