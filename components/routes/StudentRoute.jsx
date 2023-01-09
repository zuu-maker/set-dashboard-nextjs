import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoginMessage from "../LoginMessage";

const StudentRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "Student") {
      setShow(true);
      setLoading(false);
    } else if (user && user.role === "Admin") {
      router.push("/admin");
    } else if (user && user.role === "Teacher") {
      router.push(`/courses/${user.id}`);
    }
  }, [user]);

  return <>{show ? !loading && children : !loading && <LoginMessage />}</>;
};

export default StudentRoute;
