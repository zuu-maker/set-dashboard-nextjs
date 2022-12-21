import axios from "axios";

const readOrders = async (page) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-orders/${page}`
  );
  const orders = res.data;

  return orders;
};

const myOrders = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-my-orders/${id}`
  );
  return data;
};

export { readOrders, myOrders };
