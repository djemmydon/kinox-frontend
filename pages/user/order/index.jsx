import React from "react";
import AllOrders from "../../../component/AllOrders";

function Order({ order }) {
  return (
    <div>
      <AllOrders order={order} />
    </div>
  );
}

export default Order;

export const getServerSideProps = async () => {
  const res = await fetch(`https://kinox-backend.vercel.app/api/v1/order`);
  const data = await res.json();

  return {
    props: {
      order: data,
    },
  };
};
