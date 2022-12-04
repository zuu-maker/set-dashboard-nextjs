import React, { useState, useEffect } from "react";
import Head from "next/head";
import { auth } from "../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      if (user && user.role === "Teacher") {
        router.push(`courses/${user.id}`);
      } else if (user && user.role === "Student") {
        router.push("study/my-courses");
      }
      router.push("/");
    }
  }, [user]);

  const getCurrentUser = async (token, _email) => {
    console.log(_email);
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/current-user`,
      {
        email: _email,
      },
      {
        headers: {
          token,
        },
      }
    );
  };

  const handleLogin = () => {
    setDisable(true);
    setLoading(true);
    email.toLowerCase();

    if (!email || !password) {
      alert("Email and password can't be empty");
    }

    signInWithEmailAndPassword(
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
                  alert(
                    `Email Verification link has been sent to${userCredentials.user.email}`
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            getCurrentUser(idToken, userCredentials.user.email)
              .then((res) => {
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
                if (res.data.role === "Admin") {
                  router.push("/");
                  setDisable(false);
                  setLoading(false);
                } else if (res.data.role === "Student") {
                  router.push("/study/my-courses");
                  setDisable(false);
                  setLoading(false);
                } else {
                  router.push(`/courses/${res.data._id}`);
                  setDisable(false);
                  setLoading(false);
                }
              })
              .catch((err) => {
                console.log("server error -->", err);
                setError("User may not exist/db error");
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
        <title>SET - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-gray-50 px-2 py-5 sm:p-20 shadow-lg w-4/5 sm:w-3/6">
        <div className="p-5 bg-gray-100 flex items-center justify-between">
          <Image src="/logo.png" width={72} height={68} className="mr-3 " />
          <h1 className="text-2xl font-bold text-sky-400">Login</h1>
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block  text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="text-white bg-gradient-to-r flex justify-center from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mt-2 mr-2 mb-2 text-lg w-full"
          disabled={!email || !password || disable}
          onClick={handleLogin}
        >
          {loading ? (
            <div className="flex w-full px-10 sm:px-40 justify-between items-center">
              <svg
                className=" w-8 h-8 text-gray-200 animate-spin fill-cyan-600"
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
              Logging In....
            </div>
          ) : (
            <span>login</span>
          )}
        </button>
        {error && error.length > 0 && (
          <p className="text-xs sm:text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
