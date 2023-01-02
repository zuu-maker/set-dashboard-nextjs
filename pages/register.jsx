import React, { useState, useEffect } from "react";
import Head from "next/head";
import { auth } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import validator from "email-validator";

const register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const { name, password, email, city, phone } = data;

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createUser = async () => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user`,
      {
        name,
        email,
        phone,
        city,
      }
    );
  };

  const handleRegister = () => {
    setDisable(true);
    setLoading(true);
    email.toLowerCase();

    if (!validator.validate(email)) {
      setError("Invalid email Format");
      return;
    }

    if (!email || !password || !name || !city || !phone) {
      setError("Please fill in every field");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      email.toString().toLowerCase().trim(),
      password
    )
      .then((userCredentials) => {
        userCredentials.user.getIdToken().then((idToken) => {
          if (idToken.length > 0 && userCredentials.user.email) {
            if (!userCredentials.user.emailVerified) {
              sendEmailVerification(userCredentials.user)
                .then(() => {
                  toast.success(
                    `Email Verification link has been sent to${userCredentials.user.email}`
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            createUser()
              .then((res) => {
                console.log(res.data);
                router.push(`/courses/${res.data._id}`);
                setData({
                  name: "",
                  email: "",
                  phone: "",
                  city: "",
                  password: "",
                });
                setDisable(false);
                setLoading(false);
                dispatch(
                  setUser({
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    token: idToken,
                    role: res.data.role,
                    isVerified: userCredentials.user.emailVerified,
                  })
                );
              })
              .catch((err) => {
                console.log("server error -->", err);
                setError("Seerver Error");
                setDisable(false);
                setLoading(false);
              });
          }
        });
      })
      .catch((err) => {
        setError(err.message);
        setDisable(false);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-100">
      <Head>
        <title>SET - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-gray-50 px-2 py-5 sm:p-20 shadow-lg w-4/5 sm:w-3/6">
        <div className="p-5 bg-gray-100 flex items-center justify-between">
          <Image src="/logo.png" width={72} height={68} className="mr-3 " />
          <h1 className="text-2xl font-bold text-sky-400">Register</h1>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block  text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={name}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-4 mt-4">
          <label
            htmlFor="email"
            className="block  text-sm font-medium text-gray-900"
          >
            E-mail
          </label>
          <input
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={email}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block  text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative bg-red-500 items-center">
            <input
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type={show ? "text" : "password"}
              value={password}
              onChange={handleOnChange}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute inline-block bottom-1 right-5"
            >
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="sm:w-8 sm:h-8 h-6 w-6 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="sm:w-8 sm:h-8 h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label
            htmlFor="city"
            className="block  text-sm font-medium text-gray-900"
          >
            City
          </label>
          <input
            name="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={city}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block  text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="tel"
            value={phone}
            onChange={handleOnChange}
          />
        </div>

        {error && error.length > 0 && (
          <p className="text-xs sm:text-sm text-red-500">{error}</p>
        )}
        <button
          className="text-white disabled:opacity-75 bg-gradient-to-r flex justify-center from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mt-2 mr-2 mb-2 text-lg w-full"
          disabled={!email || !password || disable}
          onClick={handleRegister}
        >
          {loading ? (
            <div className="flex w-full px-10 sm:px-40 justify-center items-center">
              <svg
                className=" w-7 h-7 text-gray-200 animate-spin fill-cyan-600"
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
            <span>Register</span>
          )}
        </button>
        <div className="p-2 flex justify-between text-base text-gray-600">
          <Link className="hover:underline" href="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default register;
