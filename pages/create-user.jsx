import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import CreateUserForm from "../components/CreateUserForm";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  role: "Teacher",
  uploading: false,
  loading: false,
};

const CreateUser = () => {
  const [values, setValues] = useState(initialValues);
  let dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { email, password, phone } = values;

  const createUserInDb = async () => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user`,
      values
    );
  };

  const test = () => {
    createUserInDb()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    console.log(values);

    if (password.length < 6) {
      alert("password cannot be less than 6 characters.");
      return;
    }

    if (phone.length !== 10) {
      alert("Invalid Phone Number");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("this ->", userCredential.user);
        userCredential.user
          .getIdTokenResult()
          .then((idTokenResult) => {
            createUserInDb()
              .then((res) => {
                console.log(res.data);
                sendEmailVerification(userCredential.user)
                  .then(() => {
                    alert(
                      `verification link has been sent to ${res.data.email}`
                    );
                  })
                  .catch((err) => {
                    alert("failed to send verification");
                  });
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
                router.push("/");
              })
              .catch((err) => {
                console.log("failed to created in db ==>", err);
              });
          })
          .catch((err) => console.log("failed to get token", err));
      })
      .catch((err) => console.log("failed in firebase", err));
  };

  return (
    <div className="">
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
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Add User</h2>
            <CreateUserForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
