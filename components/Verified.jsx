import React from "react";
import Typewriter from "typewriter-effect";

const Verified = () => {
  return (
    <div className="bg-white p-6  md:mx-auto">
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-20 h-20 mx-auto my-6"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-3xl text-base text-gray-900 mb-4 font-semibold text-center">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Payment Sucessful!")
                .callFunction(() => {
                  console.log("String typed out!");
                })
                .pauseFor(2500)
                .deleteAll()
                .changeDelay(70)
                .typeString("Return to App to get Started👩‍🎓.")
                .callFunction(() => {
                  console.log("All strings were deleted");
                })
                .start();
            }}
          />
        </h3>
        <p className="text-gray-600 mb-2 mt-5">
          Thank you for completing your secure online payment. Your Payment has
          been verified and your course has been added to your courses Tab.
        </p>
        <p>
          {" "}
          <span className="font-semibold">
            Please Navigate Back to the App to Start Learning 👩‍🎓.
          </span>{" "}
          Have a great day!{" "}
        </p>
        <div className="py-12 text-center">
          {/* <Image src="/logo.png" width={72} height={68} className="mr-3 " /> */}
        </div>
      </div>
    </div>
  );
};

export default Verified;
