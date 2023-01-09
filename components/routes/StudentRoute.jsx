import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoginMessage from "../LoginMessage";

const StudentRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [showLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    if (user && user.role === "Student") {
      setShow(true);
      setLoading(false);
    } else if (user && user.role === "Admin") {
      router.push("/admin");
    } else if (user && user.role === "Teacher") {
      router.push(`/courses/${user.id}`);
    } else if (user === null) {
      setLogin(true);
    }
  }, [user]);

  return <>{show ? children : showLogin && <LoginMessage />}</>;
};

export default StudentRoute;
