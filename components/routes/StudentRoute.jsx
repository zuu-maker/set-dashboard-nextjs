import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoginMessage from "../LoginMessage";

const StudentRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user && user.role === "Student") {
      setShow(true);
    } else if (user && user.role === "Admin") {
      router.push("/admin");
      setShow(true);
    } else if (user && user.role === "Teacher") {
      router.push(`/courses/${res.data._id}`);
    }
  }, [user]);

  return <>{show ? children : <LoginMessage />}</>;
};

export default StudentRoute;
