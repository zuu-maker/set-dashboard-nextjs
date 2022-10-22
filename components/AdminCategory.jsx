import React from "react";
import Link from "next/link";
import { removeCategory } from "../lib/category";

const AdminCategory = ({ loadCategories, setIsLoading, category }) => {
  const handleRemove = () => {
    if (
      window.confirm(`Do you want to delete ${category.name} from categories?`)
    ) {
      setIsLoading(true);
      removeCategory(category.slug)
        .then(() => {
          loadCategories();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <li className=" flex justify-between py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
      <div className="text-base">{category.name}</div>
      <div className="flex justify-between w-36">
        <Link href={`/category/${category.slug}`}>
          <span className="cursor-pointer hover:text-green-600">update</span>
        </Link>
        <p
          className="cursor-pointer hover:text-red-600"
          onClick={() => handleRemove()}
        >
          delete
        </p>
      </div>
    </li>
  );
};

export default AdminCategory;
