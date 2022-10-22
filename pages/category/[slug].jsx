import React, { useState, useEffect } from "react";
import Head from "next/head";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";

import { updateCategory, readCategory } from "../../lib/category";

const CategoryEdit = () => {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  let { slug } = router.query;

  const loadCategory = async () => {
    const _category = await readCategory(slug);
    setCategory(_category);
  };

  useEffect(() => {
    category && setName(category.name);
  }, [category]);

  useEffect(() => {
    if (slug) {
      loadCategory(slug);
    }
  }, [slug]);

  const handleSubmit = () => {
    setLoading(true);
    updateCategory(name, slug)
      .then((res) => {
        setLoading(false);
        alert("Category Updated");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update");
        setLoading(false);
      });
  };

  return (
    <div>
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
            <h2 className="text-2xlfont-semibold mb-3">Create Category</h2>
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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
