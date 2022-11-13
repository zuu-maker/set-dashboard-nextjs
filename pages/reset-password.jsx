import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPwd = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail("");
        setLoading(false);
        alert("Email reset has been sent");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Email reset has been sent");
      });
  };

  return (
    <div>
      <Head>
        <title>Set - Reset Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6 ">
            <Sidebar />
          </div>
          <div className="basis-5/6 -ml-10 p-8">
            <h2 className="text-2xl font-semibold mb-3">Reset Password</h2>
            <div className="w-1/3">
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
              />
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="button"
                className="text-white w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-4 text-center mt-2 mr-2 mb-2"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
