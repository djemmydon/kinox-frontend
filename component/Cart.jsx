import React from "react";
import { useStateContext } from "../context/StateContex";

function Cart() {
  const { cartItems, toggleCartItemQuanitity } = useStateContext();

  return (
    <div>
      {cartItems.length < 1 && <h1>Cart is Empty</h1>}

      {cartItems?.length >= 1 &&
        cartItems?.map((item) => (
          <div key={item?._id}>
            <h1> {item?.name}</h1>
            <span onClick={() => toggleCartItemQuanitity(item._id, "dec")}>
              -
            </span>
            <span>{item?.quantity}</span>
            <span onClick={() => toggleCartItemQuanitity(item._id, "inc")}>
              +
            </span>
          </div>
        ))}
    </div>
  );
}

export default Cart;
