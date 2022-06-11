import React, { useEffect } from "react";
import styles from "./styling/placeorder.module.scss";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import axios from "axios";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { getError } from "../lib/err";
import Link from "next/link";

function OrderReview() {
  const { state, dispatch } = useStateContext();
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const totalPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);

  const shippingFee = totalPrice > 20000 ? 1000 : 0;

  const overRawPrice = totalPrice + shippingFee;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `/api/orders`,
        {
          orderItems: cartItems.map((x) => ({
            ...x,
            inStock: undefined,
            slug: undefined,
          })),
          shippingAddress,
          totalQuantity,
          totalPrice,
          shippingFee,
          overRawPrice,
        },

        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch("REMOVE_CART_ITEM");
      jsCookie.remove("cartItems");
      router.push(`/order/${data}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  console.log(process.env.TOKEN_JSON);

  return (
    <main className={styles.placeorder}>
      <div className={styles.placeorderFlex}>
        <div className={styles.shippingaddress}>
          <h2>Billing Address</h2>

          <h5>
            Full Name: <span>{shippingAddress.fullName}</span>{" "}
          </h5>
          <h5>
            Phone: <span>{shippingAddress.phone}</span>{" "}
          </h5>
          <h5>
            Address1: <span> {shippingAddress.address1}</span>
          </h5>
          <h5>
            Address2: <span> {shippingAddress.address2}</span>
          </h5>
          <h5>
            City: <span>{shippingAddress.city}</span>
          </h5>
          <h5>
            Country: <span> {shippingAddress.country}</span>
          </h5>
          <h5>
            Zip Code: <span>{shippingAddress.zipCode}</span>{" "}
          </h5>

          <Link href="/shipping">Edit</Link>

          <div className={styles.productPreview}>
            <h2>Products</h2>

            {cartItems?.map((item, idx) => (
              <div className={styles.product} key={idx}>
                <img src={item.image} />
                <h1>{item.name}</h1>
                <p>Price: ₦{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.checkout}>
          <h1>Total Quantity : {totalQuantity}</h1>
          <h1>Shipping Fee: ₦{shippingFee}</h1>

          <h1>Products Price : ₦{totalPrice}</h1>
          <h1>Total Price : ₦{overRawPrice}</h1>
          <img src="/img/payment.png" alt="" />

          <button onClick={handlePayment}>Checkout</button>
        </div>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(OrderReview), { ssr: false });
