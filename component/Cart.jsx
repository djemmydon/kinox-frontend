import React, { useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContex";
import styles from "./styling/cart.module.scss";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { urlFor } from "../lib/client";

function Cart() {
  const { cartItems, toggleCartItemQuanitity, totalPrice, setCartItems } =
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
        cartItems?.map((item, index) => (
          <div key={index} className={styles.ProductDetail}>
            <div>
              <img src={urlFor(item.image[0])} alt="" />
            </div>

            <div>
              <h1> {item?.name}</h1>
              <h5>₦{item.price}.00</h5>
              <div className={styles.ProductDetailShowDecInc}>
                <div>
                  <span>{item?.quantity}</span>
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
            <div>
              <h2>{totalPrice}</h2>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Cart;
