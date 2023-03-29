import React from "react";
import { useStateContext } from "../context/StateContex";

function AllOrders({ order }) {
  const { state } = useStateContext();
  const {
    userInfo,
    } = state;
    


  return (
    <div>
      {order.filter((x) => x.email === userInfo.email).map((item) => (
        <div key={item._id}>
          <p>{item.firstName}</p>
        </div>
      ))}
    </div>
  );
}

export default AllOrders;
