import React, { useState, useEffect } from "react";
import Head from "next/head";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import AdminCategory from "../../components/AdminCategory";

import { createCategory, readCategories } from "../../lib/category";
import Loader from "../../components/util/Loader";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const _categories = await readCategories();
    setCategories(_categories);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadCategories();
  }, []);

  const handleSubmit = () => {
    createCategory(name)
      .then((res) => {
        loadCategories();
        console.log(res.data);
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>SET - Create Category</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Create Category</h2>
            <div className="mb-6">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
              />
              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
              >
                Create
              </button>
            </div>
            <div>
              <h6 className="mb-4 text-lg font-semibold">All Categories</h6>
              {loading ? (
                <Loader />
              ) : (
                <ul className="w-3/5 text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200">
                  {categories.map((c, i) => (
                    <AdminCategory
                      key={i}
                      loadCategories={loadCategories}
                      setIsLoading={setLoading}
                      category={c}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
