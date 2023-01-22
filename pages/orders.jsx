import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { myOrders } from "../lib/order";
import StudentRoute from "../components/routes/StudentRoute";
import AdminNav from "../components/AdminNav";
import Head from "next/head";
import OrderItem from "../components/OrderItem";
import axios from "axios";
import ModalLoader from "../components/util/ModalLoader";
import FlipMove from "react-flip-move";
import Loader from "../components/util/Loader";

const orders = () => {
  const { user } = useSelector((state) => state);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const loadOrders = async (id) => {
    const _orders = await myOrders(id);
    setOrders(_orders);
    setLoading(false);
  };

  const verifyPayment = async (token, id) => {
    setLoader(true);
    try {
      let parser = new DOMParser();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dpo/verify-token`,
        {
          refToken: token,
        }
      );

      let doc = parser.parseFromString(data.data, "text/xml");
      let result = doc
        .getElementsByTagName("Result")[0]
        .childNodes[0].nodeValue.toString();
      let _error = doc
        .getElementsByTagName("ResultExplanation")[0]
        .childNodes[0].nodeValue.toString();

      if (result === "000") {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verifiy-state`,
          {
            orderId: id,
            userId: user.id,
          }
        );
        setLoader(false);
        setLoading(true);
        loadOrders(user.id);
        return;
      }

      if ((result === "904" || result === "901", result === "903")) {
        console.log("cancel state");
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cancel-state`, {
          id,
        });
        setLoader(false);
        setLoading(true);
        loadOrders(user.id);

        return;
      }

      setError(_error);
      console.log("error -->", _error);
      setLoader(false);
    } catch (error) {
      console.error("error, =>", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user && user.id.length > 0) loadOrders(user.id);
  }, [user]);

  return (
    <StudentRoute>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex justify-center">
          {loading ? (
            <div className="basis-5/6 -ml-10 p-8">
              <Loader />
            </div>
          ) : (
            <div className=" p-3 sm:p-8">
              {orders && orders.length > 0 ? (
                <h2 className="text-2xl mb-8 font-semibold">My Orders</h2>
              ) : (
                <h2 className="text-2xl mb-8 font-semibold">My Orders</h2>
              )}
              <div style={{ postion: "relative" }}>
                <FlipMove className="flip-wrapper" style={{ color: "red" }}>
                  {orders?.map((order) => (
                    <OrderItem
                      key={order?._id}
                      verify={verifyPayment}
                      order={order}
                    />
                  ))}
                </FlipMove>
              </div>
              {/* )} */}
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
      {loader && <ModalLoader />}
    </StudentRoute>
  );
};

export default orders;
