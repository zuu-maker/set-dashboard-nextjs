import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TeacherRoute = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user && user.role === "Teacher") {
      setShow(true);
      router.push(`/courses/${res.data._id}`);
    } else if (user && user.role === "Student") {
      router.push("/");
    }
  }, [user]);

  return <>{show && children}</>;
};

export default TeacherRoute;
