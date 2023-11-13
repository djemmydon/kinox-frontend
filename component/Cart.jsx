// import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContex";
import styles from "./styling/cart.module.scss";
import { useRouter } from "next/router";
// import axios from "axios";
import toast from "react-hot-toast";
import {AiOutlineClose} from "react-icons/ai"
function Cart(props) {
  const router = useRouter();
 

  // const totalQuan = () => {
  //   setTotalQuantity();
  // };

  //CALLING THE CART //
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useStateContext();

  const handleRemover = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const handleQuantity = async (item, qty) => {
    // const { data } = await axios.get(`/api/products/${item._id}`);

    // if (data.price > quantity) {
    // }
    const quantity = Number(qty);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: item._key,
        name: item.name,
        slug: item.slug,
        inStock: item.inStock,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity,
      },
    });
    toast.success(`Cart updated`);
  };


  return (
    <div className={styles.carts}>
      {cartItems?.length < 1 && (
        <div className={styles.empty_cart}>
          <h1>Your Shopping Cart Is Empty</h1>
          <div>
            <img src="/img/icons8-buy.gif" alt="Kinox Apparel Shopping cart" />
          </div>

          <Link href="/products">
            <button onClick={props.data}>Continue Shoping</button>
          </Link>
        </div>
      )}

      {cartItems?.length >= 0 &&
        cartItems.map((item, index) => (
          <div key={index} className={styles.ProductDetail}>
            <div>
              <img src={item.image} alt="Kinox Apparel Product Image" />
            </div>

            <div>
              <h1> {item?.name}</h1>
              <h5>₦{item.price}.00</h5>
              <span>
                <div className={styles.selectOption}>
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantity(item, e.target.value)}
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </span>
            </div>

            <div>
              <button onClick={() => handleRemover(item)}>   <AiOutlineClose
            className={styles.nav_cancel}
            color="white"
            size={15}
          /></button>
            </div>
          </div>
        ))}

      {cartItems?.length >= 1 && (
        <div className={styles.bottom}>
          <div className={styles.quantity}>
            <h1>
              Total Price: ₦
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toLocaleString()}{" "}
            </h1>
            <h1>
              Total Quantity:{cartItems.reduce((a, c) => a + c.quantity, 0)}
              {""}
            </h1>
          </div>

          <div className={styles.button}>
            
            <button
              onClick={() => {
                router.push("/placeorder");
              }}
              onMouseUp={props.data}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
