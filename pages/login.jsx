import React, { useState, useEffect } from "react";
import Head from "next/head";
import { auth } from "../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) router.push("/course");
  }, []);

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
    email.toLowerCase();

    if (!email || !password) {
      alert("Email and password can't be empty");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        userCredentials.user.getIdToken().then((idToken) => {
          if (idToken.length > 0 && userCredentials.user.email) {
            console.log(userCredentials.user);
            getCurrentUser(idToken, userCredentials.user.email)
              .then((res) => {
                if (res.data.role !== "Student") {
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
                  } else {
                    router.push(`/courses/${res.data._id}`);
                  }
                } else {
                  signOut(auth);
                  alert("Not Authorised");
                }
              })
              .catch((err) => {
                console.log("server error -->", err);
                alert("user does not exist");
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid Credentials");
      });

    //  () =>
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>SET - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-3/6">
        <div className="p-5 bg-gray-300">
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
          className="text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mt-2 mr-2 mb-2 text-lg w-full"
          disabled={!email || !password}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
