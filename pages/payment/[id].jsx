import React from "react";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";

const payment = () => {
  const router = useRouter();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [hidden, setHidden] = useState(true);
  const [info, setInfo] = useState(null);

  const { firstName, lastName, email, mobileNumber } = data;

  const { id } = router.query;

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getInfo = async (_id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-session/${_id}`
      );
      console.log("data --", data);
      setInfo(data);
      setHidden(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id.length > 0) {
      console.log(id);
      getInfo(id);
    }
  }, [id]);

  const handleOnClick = async () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !mobileNumber) return;

    let date = new Date();

    let month = parseInt(date.getMonth() + 1);

    let _date =
      date.getFullYear() + "/" + month.toString() + "/" + date.getDate();

    let refTokenRight = date.getTime().toString();

    //note this email comes from the previous page
    let refToken = info.userId + "-" + refTokenRight;

    try {
      let parser = new DOMParser();

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pay/dpo/create-token`,
        {
          amount: 0.05,
          email,
          phone: mobileNumber,
          date: _date,
          refToken,
          firstName,
          lastName,
        }
      );

      console.log("created");

      let doc = parser.parseFromString(data.data, "text/xml");
      let result = doc
        .getElementsByTagName("Result")[0]
        .childNodes[0].nodeValue.toString();

      console.log("result --.", result);

      if (result !== "000") {
        let _error = doc
          .getElementsByTagName("ResultExplanation")[0]
          .childNodes[0].nodeValue.toString();
        setError(_error);
        console.log(_error);
        setLoader(false);
        return;
      }

      let transactionToken = doc
        .getElementsByTagName("TransToken")[0]
        .childNodes[0].nodeValue.toString();

      if (result === "000" && transactionToken && transactionToken.length > 0) {
        setToken(transactionToken);
        console.log("here");
        //please do course id and user id stuff
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-order`,
          {
            userId: info.userId,
            courseId: info.courseId._id,
            transactionToken,
            amount: 0.1,
            tokenCreatedAt: date.getTime(),
          }
        );

        if (data === "ok") {
          setChecked(true);
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-session/${id}`
          );
        }
      } else {
        if (!error && !error.length === 0) {
          setError("Too many requests try again later");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (hidden) return <div className="min-h-screen w-full"></div>;

  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Secure Payment </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" w-full bg-gray-50 ">
        <div className="h-8 bg-transparent w-full"></div>
        <AdminNav />
      </div>
      <div className="min-w-screen min-h-screenflex  bg-gray-50  items-center justify-center px-5 pb-10 pt-16">
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: 600 }}
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-cyan-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment
            </h1>
            <h4 className="text-center font-bold text-lg ">
              Course:{" "}
              <span className="font-normal">{info?.courseId?.name}</span>
            </h4>
            <h4 className="text-center font-bold text-lg ">
              Amount:{" "}
              <span className="font-normal">
                {info?.courseId?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ZMK",
                })}
              </span>
            </h4>
          </div>
          <div className="mb-3 flex -mx-2">
            <div className="px-2">
              <div htmlFor="type1" className="flex items-center cursor-pointer">
                <img src="/airmtn.jpeg" className="h-12 w-28 ml-3" />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">First Name</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="John"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                type="text"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Last Name</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Doe"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                type="text"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Email</label>
            <div>
              <input
                name="email"
                value={email}
                onChange={handleOnChange}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="youremail@mail.com"
                type="email"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Mobile Number</label>
            <div>
              <input
                name="mobileNumber"
                value={mobileNumber}
                onChange={handleOnChange}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="e.g. 0955331122"
                type="text"
              />
            </div>
          </div>

          <div>
            {checked ? (
              <a
                target="_blank"
                href={`https://secure.3gdirectpay.com/payv2.php?ID=${token}`}
                className="flex items-center justify-center w-full max-w-xs mx-auto bg-emerald-500 hover:bg-emerald-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold disabled:opacity-50"
              >
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>

                  <span>PAY SECURELY</span>
                </div>
              </a>
            ) : (
              <button
                disabled={
                  !firstName || !lastName || !email || !mobileNumber || loading
                }
                onClick={handleOnClick}
                className="flex items-center justify-center w-full max-w-xs mx-auto bg-cyan-500 hover:bg-cyan-700 focus:bg-cyan-700 text-white rounded-lg px-3 py-3 font-semibold disabled:opacity-50"
              >
                <div className="flex items-center space-x-1">
                  {loading ? (
                    <svg
                      className="w-5 h-5 mr-2 text-gray-200 animate-spin fill-cyan-600"
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
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                  <span>PAY NOW</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default payment;
