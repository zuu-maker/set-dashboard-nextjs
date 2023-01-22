import React, { useState } from "react";
import Head from "next/head";
import AdminNav from "../../../components/AdminNav";
import Sidebar from "../../../components/Sidebar";
import AdminRoute from "../../../components/routes/AdminRoute";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import SelectedItem from "../../../components/SelectedItem";
import CreateBundleForm from "../../../components/CreateBundleForm";
import { getBundle, updateBundle } from "../../../lib/bundle";
import { getPublishedCoursesIds } from "../../../lib/course";
import { useRouter } from "next/router";
import Loader from "../../../components/util/Loader";

const initialValues = {
  name: "",
  description: "",
  courses: [],
  price: 0,
};

export default function EditBundle() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleOnChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleOnSubmit() {
    const toastId = toast.loading("Updating Bundle");
    if (selected.length < 1) {
      toast.error("Please Select Courses.");
      return;
    }

    let selectedIds = [];

    selected.map((item) => {
      selectedIds.push(item._id);
    });

    updateBundle({
      ...values,
      courses: selectedIds,
      price: Number(values.price),
    })
      .then((res) => {
        toast.dismiss(toastId);
        if (res.data.ok) {
          router.push("/all-bundles");
          toast.success("Bundle Updated");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);

        console.log(err);
        toast.error("Could not create");
      });
  }

  async function getCourses() {
    getPublishedCoursesIds()
      .then((courses) => {
        setOptions(
          courses.map((course) => ({
            ...course,
            label: course.name,
            value: course._id,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  async function fetchBundle() {
    getBundle(router.query.slug)
      .then((data) => {
        setValues(data);
        setSelected(data.courses);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function removeFromSelected(id) {
    let _selected = selected.filter((selectedItem) => selectedItem._id !== id);
    setSelected(_selected);
  }

  useEffect(() => {
    fetchBundle();
    getCourses();
  }, []);

  return (
    <AdminRoute>
      <Head>
        <title>SET - Create Bundle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <AdminNav />
        <div className="flex flex-row">
          <div className="basis-1/6">
            <Sidebar />
          </div>
          <div className="basis-5/6 p-8">
            <h2 className="text-2xl font-semibold mb-3">Edit Bundle</h2>
            {/* <pre>{JSON.stringify(selected)}</pre> */}

            <br />
            {loading ? (
              <Loader />
            ) : (
              <div>
                <p className="text-lg mb-2 text-gray-500 font-semibold underline">
                  {" "}
                  Select Courses
                </p>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
                <br />
                {selected?.length > 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl font-semibold underline">
                      {" "}
                      Courses to be bundled
                    </p>

                    <div className="flex flex-col mt-4 border-gray-300 border bg-white divide-y rounded-lg flex-none w-full md:w-1/2 lg:w-1/3">
                      <div className="flex flex-col space-y-2 divide-y">
                        {selected.map((item, index) => (
                          <SelectedItem
                            removeFromSelected={removeFromSelected}
                            key={index}
                            index={index}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <hr className="mt-8" />
                <CreateBundleForm
                  buttonText={"Update"}
                  handleOnSubmit={handleOnSubmit}
                  handleOnChange={handleOnChange}
                  values={values}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
