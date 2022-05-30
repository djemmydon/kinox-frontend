import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContex";
import styles from "./styling/cart.module.scss";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { urlFor } from "../lib/client";
// import PaystackPop from "@paystack/inline-js";

function Cart() {
  // const { cartItems, totalQuantity, totalPrice } = useStateContext();
  const [email, setEmail] = useState("");

 
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useStateContext();

  const handleRemover = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  return (
    <div className={styles.carts}>
      {cartItems?.length < 1 && (
        <div className={styles.empty_cart}>
          <h1>Your Shopping Cart Is Empty</h1>
          <Link href="/products">
            <button>Continue Shoping</button>
          </Link>
        </div>
      )}

      {cartItems?.length >= 0 &&
        cartItems?.map((item, index) => (
          <div key={index} className={styles.ProductDetail}>
            <div>
              <img src={item.image[0]} alt="" />
            </div>

            <div>
              <h1> {item?.name}</h1>
              <h5>₦{item.price}.00</h5>
              <span>{item?.quantity}</span>
              <div className={styles.ProductDetailShowDecInc}>
                <div>
                
                  <button onClick={handleRemover}>Remove</button>

                </div>
                {/* <div>
                  <BiUpArrow
                    onClick={() => toggleCartItemQuanitity(item._id, "dec")}
                  />

                  <BiDownArrow
                    onClick={() => toggleCartItemQuanitity(item._id, "inc")}
                  />
                </div> */}
              </div>
            </div>
          </div>
        ))}

      {cartItems?.length >= 1 && (
        <div className={styles.bottom}>
          <div className={styles.quantity}>
            <h1>
              Total Price:( {cartItems.reduce((a, c) => a + c.quantity, 0)}
              {""} ) : ${" "}
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </h1>
            <h1>Total Quantity: 44</h1>
          </div>

          <div className={styles.button}>
            <button>
              {" "}
              <Link href="/checkout"> Checkout with Stripe ✈</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
