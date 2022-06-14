import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";
import { useStateContext } from "../../context/StateContex";
import { getError } from "../../lib/err";
import { PaystackButton } from "react-paystack";
import styles from "../../component/styling/placeorder.module.scss";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: " " };
    case "SUCCESS_REQUEST":
      return { ...state, loading: false, order: action.payload, error: " " };
    case "FAIL_REQUEST":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loading: true, error: " " };
    case "PAY_SUCCESS":
      return { ...state, loading: false, successPay: true };
  }
}

function OrderScreen({ params }) {
  const [{ order }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    order: {},
  });

  const {
    shippingAddress,
    totalPrice,
    shippingFee,
    orderItems,
    overRawPrice,
    // isPaid,
    // paidAt,
    totalQuantity,
    isDelivered,
    deliveredAt,
    // createdAt,
  } = order;

  const { state } = useStateContext();
  const { userInfo } = state;
  const { router } = useRouter();

  const publicKey = "pk_test_9286738c5dddd1dd2a33753aaccc3383eb2ee96a";

  useEffect(() => {
    if (!userInfo) {
      router.push("/register");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "SUCCESS_REQUEST", payload: data });
      } catch (err) {
        dispatch({ type: "FAIL_REQUEST", payload: getError(err) });
      }
    };

    if (!order._id) {
      fetchOrder();
    }
  }, [router, order, userInfo, orderId]);

  const componentProps = {
    email: userInfo.email,
    amount: totalPrice * 100,
    metadata: {
      name: shippingAddress?.fullName,
    },

    publicKey,
    text: "Pay Now",
    onSuccess: async () => {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/pay`,

          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        dispatch({ type: "PAY SUCESS", payload: data });
        alert("Thanks for doing business with us! Come back soon!!");
      } catch (error) {
        alert(getError(error));
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };
  const { id: orderId } = params;

  console.log(userInfo.token);
  return (
    <div>
      <h1>Order {orderId}</h1>

      <main className={styles.placeorder}>
        <div className={styles.placeorderFlex}>
          <div className={styles.shippingaddress}>
            <h2>Billing Address</h2>

            <h5>
              Full Name: <span>{shippingAddress?.fullName}</span>{" "}
            </h5>
            <h5>
              Phone: <span>{shippingAddress?.phone}</span>{" "}
            </h5>
            <h5>
              Address1: <span> {shippingAddress?.address1}</span>
            </h5>
            <h5>
              Address2: <span> {shippingAddress?.address2}</span>
            </h5>
            <h5>
              City: <span>{shippingAddress?.city}</span>
            </h5>
            <h5>
              Country: <span> {shippingAddress?.country}</span>
            </h5>
            <h5>
              Zip Code: <span>{shippingAddress?.zipCode}</span>{" "}
            </h5>

            <div className={styles.productPreview}>
              <h2>Products</h2>

              {orderItems?.map((item, idx) => (
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
            <PaystackButton {...componentProps} />

            {/* <button onClick={handlePayment}>Checkout</button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

export function getServerSideProps({ params }) {
  return { props: { params } };
}
