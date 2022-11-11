import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Verified from "../../components/Verified";
import NotVerified from "../../components/NotVerified";
import Loader from "../../components/util/Loader";

const VerifyToken = () => {
  const router = useRouter();
  const { refToken } = router.query;
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const verifyToken = async (_refToken) => {
    let parser = new DOMParser();

    let userId = _refToken.split("-")[0];
    let time = _refToken.split("-")[1];
    console.log(_refToken);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-order/${userId}/${time}`
      );
      console.log(data);

      if (!res.data.transactionToken) return;

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dpo/verify-token`,
        {
          refToken: res.data.transactionToken,
        }
      );

      let doc = parser.parseFromString(data.data, "text/xml");
      let result = doc
        .getElementsByTagName("Result")[0]
        .childNodes[0].nodeValue.toString();
      let _error = doc
        .getElementsByTagName("ResultExplanation")[0]
        .childNodes[0].nodeValue.toString();

      if (result === "000") {
        setIsVerified(true);
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verifiy-state`,
          {
            orderId: res.data._id,
            userId,
          }
        );
        //treat it as verified
        //send over user id and order id
        //change order status

        //if payment is verifed change users subscription state
      }

      if (result === "901") {
        //treat it as verified
      }

      if (result === "904" || result === "901") {
        //treat it as cancelled
      }

      // set to account error
      setError(_error);
      console.log("error -->", _error);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(refToken);
    if (refToken && refToken.length > 0) verifyToken(refToken);
  }, [refToken]);

  return (
    <div className="bg-gray-100 h-screen">
      {loading ? <Loader /> : isVerified ? <Verified /> : <NotVerified />}
    </div>
  );
};

export default VerifyToken;
