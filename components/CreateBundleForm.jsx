import React from "react";

export default function CreateBundleForm({
  values,
  handleOnChange,
  handleOnSubmit,
  buttonText,
}) {
  return (
    <div>
      <p className="text-2xl mt-8 mb-2  font-semibold ">
        {" "}
        Fill in the Bundle Information
      </p>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-2/4 space-y-4">
          <input
            name="name"
            value={values.name}
            onChange={handleOnChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Name"
          />
          <textarea
            name="description"
            value={values.description}
            onChange={handleOnChange}
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
          ></textarea>

          <input
            name="price"
            value={values.price}
            onChange={handleOnChange}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Price"
          />
          <button
            disabled={!values.price || !values.name || !values.description}
            onClick={handleOnSubmit}
            type="button"
            className="text-white w-full disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
