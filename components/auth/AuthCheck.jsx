import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import Loader from "../util/Loader";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  const getCurrentUser = async (token, _email) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/current-user`,
      {
        email: _email,
      },
      {
        headers: {
          token,
        },
      }
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      if (_user) {
        _user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.token.length > 0) {
            getCurrentUser(idTokenResult.token, _user.email)
              .then((res) => {
                dispatch(
                  setUser({
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    isVerified: _user.emailVerified,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
                alert(err);
              });
          }
        });
      }
      setLoader(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return <>{loader ? <Loader /> : children}</>;
};

export default AuthCheck;
