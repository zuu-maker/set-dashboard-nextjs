import React, { useState } from "react";
import ClosedEye from "./util/ClosedEye";
import OpenEye from "./util/OpenEye";

const CreateUserForm = ({ values, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {values && (
        <div className="flex">
          <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
            <div>
              <label
                htmlFor="name"
                className="block  text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block  text-sm font-medium text-gray-900"
              >
                City
              </label>
              <input
                name="city"
                id="city"
                value={values.city}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="city"
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
                id="phone"
                value={values.phone}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="phone"
              />
            </div>

            <button
              disabled={values.loading || values.uploading}
              onClick={handleSubmit}
              type="button"
              className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-4 text-center mt-2 mr-2 mb-2"
            >
              Add User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
