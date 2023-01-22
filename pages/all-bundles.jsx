import React from "react";
import Loader from "../components/util/Loader";
import AdminRoute from "../components/routes/AdminRoute";
import Head from "next/head";
import AdminNav from "../components/AdminNav";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import {
  getBundles,
  publishBundleToDb,
  unPublishBundleFromDb,
} from "../lib/bundle";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";

function Bundle({ bundle, unPublish, publish, remove }) {
  return (
    <li className="pb-2 pt-2 sm:pb-4 w-full">
      <div className="flex w-full items-center justify-between cursor-pointer">
        <Link href={`/bundle/edit/${bundle.slug}`}>
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-md font-medium text-gray-900 truncate ">
                {bundle.name}
              </p>
              <p className="text-sm text-gray-500 truncate ">
                {bundle.courses?.length} courses
              </p>
            </div>
          </div>
        </Link>

        <div className="flex space-x-8">
          {bundle.published ? (
            <button
              onClick={() => unPublish(bundle._id)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Un-Publish
            </button>
          ) : (
            <button
              onClick={() => publish(bundle._id)}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Publish
            </button>
          )}
          <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
            Zk{" " + bundle.price}
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-6 text-red-500 hover:scale-110"
              onClick={() => remove(bundle._id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function AllBundles() {
  const [bundles, seBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchBundles() {
    try {
      const _bundles = await getBundles();
      seBundles(_bundles);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const publish = (id) => {
    let answer = window.confirm(
      "Once bundle is published it will be avalible for students to enroll"
    );

    if (!answer) return;

    publishBundleToDb(id)
      .then((res) => {
        toast.success("bundle is now live!!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops failed to publish");
      });
  };

  const unPublish = (id) => {
    let answer = window.confirm(
      "Once bundle is unpublished it will not be avalible for students to enroll"
    );

    if (!answer) return;

    unPublishBundleFromDb(id)
      .then((res) => {
        toast.success("bundle has been successfully unpublished");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sorry failed to unpublished");
      });
  };

  const remove = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-bundle/${id}`
      );
      toast.success("Bundle has been deleted");
      let _bundles = bundles.filter((bundle) => bundle._id !== id);
      seBundles(_bundles);
    } catch (error) {
      toast.error("failed to delete bundle");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <AdminRoute>
      <Head>
        <title>SET - All Bundles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 w-full">
            <div className="p-8">
              <h2 className="text-2xl font-semibold">All Bundles</h2>

              {loading ? (
                <Loader />
              ) : (
                <ul className="divide-y mt-4 w-2/6 divide-gray-200 dark:divide-gray-700">
                  {bundles &&
                    bundles.map((bundle) => (
                      <Bundle
                        remove={remove}
                        publish={publish}
                        unPublish={unPublish}
                        key={bundle._id}
                        bundle={bundle}
                      />
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
