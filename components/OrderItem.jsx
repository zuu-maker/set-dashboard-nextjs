import React, { forwardRef } from "react";

const OrderItem = forwardRef(({ order, verify }, ref) => {
  let date = new Date(order?.createdAt);
  return (
    <div
      ref={ref}
      className=" mb-16 flex h-52 w-full sm:w-[780px] flex-col bg-white font-serif text-black shadow-xl"
    >
      <div className="mt-4">
        <h1 className="sm:mx-11 my-1 font-bold text-[16px] sm:text-[20px] text-gray-600">
          Id:{" " + order?._id}
        </h1>
      </div>

      <hr className="sm:mx-10 my-2" />
      <div className=" flex items-center mx-11 justify-between space-x-3">
        <div>
          <p>
            <span className="font-semibold">Date:</span>
            {" " + date.toDateString()}
          </p>
          <p>
            <span className="font-semibold">Time:</span>
            {" " + date.toLocaleTimeString()}
          </p>
        </div>

        {order.status === "Paid" && (
          <button className="w-32 rounded-lg border bg-green-600 font-medium text-white ">
            {order?.status}
          </button>
        )}
        {order.status === "Cancelled" && (
          <button className="w-32 rounded-lg border bg-red-600 font-medium text-white ">
            {order?.status}
          </button>
        )}
        {order.status === "Pending" && (
          <button className="w-32 rounded-lg border bg-amber-400 font-medium text-white ">
            {order?.status}
          </button>
        )}
      </div>
      <div className="mx-11 flex justify-center">
        {order.status === "Pending" && (
          <button
            onClick={() => verify(order.transactionToken, order._id)}
            className="text-white mt-4  w-3/4 sm:w-2/4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 dark:shadow-lg  font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Verify Payment
          </button>
        )}
      </div>
    </div>
  );
});

export default OrderItem;
