import React, { useEffect, useState } from "react";
import styles from "./styling/placeorder.module.scss";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

// import { getError } from "../lib/err";

function OrderReview() {
  const { state, dispatch } = useStateContext();
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const totalPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);

  const shippingFee = totalPrice > 20000 ? 1000 : 0;

  const overRawPrice = totalPrice + shippingFee;
  console.log(shippingAddress);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  console.log(cartItems);
  // const handlePayment = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `/api/orders`,
  //       {
  //         orderItems: cartItems.map((x) => ({
  //           ...x,
  //           inStock: undefined,
  //           slug: undefined,
  //         })),
  //         shippingAddress,
  //         totalQuantity,
  //         totalPrice,
  //         shippingFee,
  //         overRawPrice,
  //       },

  //       {
  //         headers: {
  //           authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );

  //     dispatch("REMOVE_CART_ITEM");
  //     jsCookie.remove("cartItems");
  //     router.push(`/order/${data}`);
  //   } catch (error) {
  //     toast.error(getError(error));
  //   }
  // };

  const handlePayment = async () => {
    setLoading(true);
    await axios
      .post(
        `https://kinox-backend.vercel.app/api/v1/order`,
        {
          order: cartItems.map((x) => ({
            ...x,
            inStock: undefined,
            slug: undefined,
          })),
          shippingAddress: shippingAddress.address1,
          totalQuantity,
          totalPrice,
          shippingFee,
          overRawPrice,
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phone: shippingAddress.phone,
          city: shippingAddress.city,
          country: shippingAddress.country,
        },

        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        try {
          console.log(res.data);
          toast.success(`Order Created Successfully`);

          dispatch("REMOVE_CART_ITEM");
          jsCookie.remove("cartItems");
          router.push(`/order/${res.data._id}`);

          setLoading(true);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      });
  };

  return (
    <main className={styles.placeorder}>
      <div className={styles.placeorderFlex}>
        <div className={styles.shippingaddress}>
          {/* <h2>Billing Address</h2>

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

          <Link href="/shipping">Edit</Link> */}

          <div className={styles.productPreview}>
            <h2>Products</h2>

            {cartItems.map((item, idx) => (
              <div className={styles.product} key={idx}>
                <img src={item.image} />
                <h1>{item.name}</h1>
                <p>Price: ₦{item.price.toLocaleString()}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.checkout}>
          <h1>
            Total Quantity: <span>{totalQuantity}</span>{" "}
          </h1>
          <h1>
            Shipping Fee: <span> ₦{shippingFee.toLocaleString()}</span>
          </h1>

          <h1>
            Products Price : <span>₦{totalPrice.toLocaleString()}</span>{" "}
          </h1>
          <h1>
            Total Price : <span>₦{overRawPrice.toLocaleString()}</span>{" "}
          </h1>

          <button onClick={handlePayment}>
            {loading ? <ClipLoader color="white" size={20} /> : "Order Now"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(OrderReview), { ssr: false });
