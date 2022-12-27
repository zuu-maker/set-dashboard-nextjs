import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import CreateUserForm from "../components/CreateUserForm";
import axios from "axios";
import AdminRoute from "../components/routes/AdminRoute";

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { phone } = values;

  const createUserInDb = async () => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user`,
      values
    );
  };

  const handleSubmit = () => {
    if (phone.length !== 10) {
      alert("Invalid Phone Number");
      return;
    }

    createUserInDb()
      .then((res) => {
        setValues(initialValues);
        alert("User Added to db, please add user to firebase authentication");
      })
      .catch((err) => {
        console.log("failed to created in db ==>", err);
        alert("All fields are required");
      });
  };

  return (
    <AdminRoute>
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
            <h2 className="text-2xl font-semibold mb-3">Add Teacher</h2>
            <CreateUserForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
            />
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default CreateUser;
