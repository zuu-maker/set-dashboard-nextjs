import axios from "axios";

const createCategory = async (name) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-category`,
    {
      name,
    }
  );
};

const readCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-categories`
  );
  const categories = res.data.categories;

  return categories;
};

const readCategory = async (slug) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-category/${slug}`
  );

  return res.data;
};

const removeCategory = async (slug) => {
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-category/${slug}`
  );
};

const updateCategory = async (name, slug) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-category/${slug}`,
    {
      name,
    }
  );
};

export {
  createCategory,
  readCategories,
  removeCategory,
  updateCategory,
  readCategory,
};
