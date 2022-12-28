import React, { useState } from "react";
import { useEffect } from "react";
import { readCategories } from "../lib/category";
import { readTeachers } from "../lib/teacher";

const CreateCourseForm = ({
  values,
  handleChange,
  handleSubmit,
  handleImage,
  preview,
  buttonText,
  handleRemove,
  image,
  editPage = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const loadCategories = async () => {
    const _categories = await readCategories();
    setCategories(_categories);
  };

  const loadTeachers = async () => {
    const _teachers = await readTeachers();
    setTeachers(_teachers);
  };

  useEffect(() => {
    loadCategories();
    loadTeachers();
  }, []);

  return (
    <div>
      {values && (
        <div className="flex">
          <div className="flex flex-col space-y-8 justify-between h-100 basis-3/6">
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Name"
            />
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description"
            ></textarea>

            <div>
              <label
                htmlFor="price"
                className="block  text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                name="price"
                id="price"
                value={values.price}
                onChange={handleChange}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="price"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block  text-sm font-medium text-gray-900"
              >
                Duration
              </label>
              <input
                name="duration"
                id="duration"
                value={values.duration}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="duration"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block  text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                name="start"
                id="start"
                value={values.start.split("T")[0]}
                onChange={handleChange}
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="duration"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block  text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <input
                name="end"
                id="end"
                value={values.end.split("T")[0]}
                onChange={handleChange}
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="duration"
              />
            </div>

            <div>
              <select
                value={values.category}
                onChange={handleChange}
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option defaultValue="No">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={values.teacher}
                onChange={handleChange}
                name="teacher"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option defaultValue="No">Assign Teacher</option>
                {teachers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <select value={category} onChange={handleCategoryChange} name="category" id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option  defaultValue='No' >Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option> )}
                </select> */}
            <div className="flex space-x-3">
              <label className="text-white flex justify-center h-14 items-center w-full bg-gradient-to-r flex-grow from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {values.uploading ? "Uploading..." : buttonText}
                <input
                  hidden
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                />
              </label>

              {editPage && values.image && values.image.Location && (
                <div className="relative">
                  <img
                    src={values.image.Location}
                    className="w-16 h-14 rounded"
                    alt=""
                  />
                  <div
                    onClick={handleRemove}
                    className="inline-flex absolute cursor-pointer -top-2 -right-2 justify-center items-center w-7 h-7 text-md font-bold text-white bg-red-500 rounded-full border-2 border-white "
                  >
                    x
                  </div>
                </div>
              )}

              {preview && (
                <div className="relative">
                  <img src={preview} className="w-16 h-14 rounded" alt="" />
                  <div
                    onClick={handleRemove}
                    className="inline-flex absolute cursor-pointer -top-2 -right-2 justify-center items-center w-7 h-7 text-md font-bold text-white bg-red-500 rounded-full border-2 border-white "
                  >
                    x
                  </div>
                </div>
              )}
            </div>
            {editPage ? (
              <button
                disabled={
                  values.loading ||
                  values.uploading ||
                  !values.image?.Location ||
                  !values.teacher ||
                  !values.category ||
                  !values.duration ||
                  !values.start ||
                  !values.end ||
                  !values.name ||
                  !values.description ||
                  !values.price
                }
                onClick={handleSubmit}
                type="button"
                className="text-white w-full disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Save and Continue
              </button>
            ) : (
              <button
                disabled={
                  values.loading ||
                  values.uploading ||
                  !image?.data?.Location ||
                  !values.teacher ||
                  !values.category ||
                  !values.duration ||
                  !values.start ||
                  !values.end ||
                  !values.name ||
                  !values.description ||
                  !values.price
                }
                onClick={handleSubmit}
                type="button"
                className="text-white w-full disabled:opacity-60 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Save and Continue
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourseForm;
