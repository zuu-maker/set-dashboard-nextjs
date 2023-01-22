import axios from "axios";

const createBundle = async (values) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-bundle`,
    {
      values,
    }
  );
};

const updateBundle = async (values) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-bundle/${values._id}`,
    {
      values,
    }
  );
};

const publishBundleToDb = async (bundleId) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/publish/${bundleId}`
  );
};

const unPublishBundleFromDb = async (bundleId) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/un-publish/${bundleId}`
  );
};

const getBundles = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-bundles`
  );
  return data;
};

const getBundle = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-bundle/${slug}`
  );
  return data;
};

export {
  createBundle,
  getBundles,
  getBundle,
  updateBundle,
  publishBundleToDb,
  unPublishBundleFromDb,
};
