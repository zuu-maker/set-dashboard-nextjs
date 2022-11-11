import axios from "axios";

const readOrders = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/read-orders`
  );
  const orders = res.data;

  return orders;
};

export { readOrders };
