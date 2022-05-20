import React, { useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContex";
import styles from "./styling/cart.module.scss";

function Cart() {
  const { cartItems, toggleCartItemQuanitity, setCartItems } =
    useStateContext();

  return (
    <div>
      {cartItems?.length < 1 && (
        <div className={styles.empty_cart}>
          <h1>Your Shopping Cart Is Empty</h1>
          <Link href="/products">
            <button>Continue Shoping</button>
          </Link>
        </div>
      )}

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
