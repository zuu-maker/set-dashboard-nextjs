import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";
import CreateUserForm from "../components/CreateUserForm";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  uploading: false,
  loading: false,
};

const CreateUser = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(values);
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
