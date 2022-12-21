import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { auth } from "../firebase";
import { logOutUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const AdminNav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let router = useRouter();

  const handleSignOut = async () => {
    let answer = window.confirm("Are you sure you want to log out?");

    if (answer) {
      await signOut(auth);
      dispatch(logOutUser());
      router.push("/login");
    }
  };

  return (
    <div className="sticky top-0 z-10">
      <nav className="bg-white  border-gray-200  ">
        <div className="flex items-center px-4 md:px-6 py-2.5 justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={64} height={64} className="mr-3 " />
          </div>
          <span className="self-center text-lg white  space-nowrap text-sky-900">
            <span className="font-bold">{user && `${user.role}:`}</span>{" "}
            {user && user.name}
          </span>
        </div>
      </nav>
      <nav className="bg-gray-100 ">
        <div className="py-3 px-4 md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-smfont-medium">
              {user && user.id && (
                <Link href="/">
                  <li>
                    <a href="#" className=" text-gray-900 hover:underline">
                      Study
                    </a>
                  </li>
                </Link>
              )}

              {user && user.id && (
                <Link href="/orders">
                  <li>
                    <a href="#" className=" text-gray-900 hover:underline">
                      Orders
                    </a>
                  </li>
                </Link>
              )}

              <Link href="/reset-password">
                <li>
                  <a href="#" className=" text-gray-900 hover:underline">
                    Reset Password
                  </a>
                </li>
              </Link>

              {user && user.id && (
                <li onClick={handleSignOut}>
                  <a href="#" className=" text-gray-900 hover:underline">
                    Log Out
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
