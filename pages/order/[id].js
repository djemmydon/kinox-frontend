import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";
import { useStateContext } from "../../context/StateContex";
import { getError } from "../../lib/err";
import { PaystackButton } from "react-paystack";

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
    // shippingFee,
    orderItems,
    overRawPrice,
    isPaid,
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
        const { data } = await axios.put(`/api/orders/${order._id}/pay`);
        dispatch({ type: "PAY SUCESS", payload: data });
        alert("Thanks for doing business with us! Come back soon!!");
      } catch (error) {
        alert(getError(error));
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };
  const { id: orderId } = params;
  return (
    <div>
      Order {orderId}
      <div>
        <div >
          <h1>Name {shippingAddress?.fullName}</h1>
          <h1>Phone Number {shippingAddress?.phone}</h1>
          <h1>Address 1 {shippingAddress?.address1}</h1>
          <h1>Address 2 {shippingAddress?.address2}</h1>
          <h1>City{shippingAddress?.city}</h1>
          <h1>Country{shippingAddress?.country}</h1>
          <h1>Zip Code{shippingAddress?.zipCode}</h1>
        </div>
      </div>
      <div>
        <h5>
          {isDelivered
            ? `Order has been Delivered  ${deliveredAt}`
            : "Not Delivered"}
        </h5>
        <h5>{isPaid ? `Paid` : "Not Paid"}</h5>
      </div>
      <div>
        {orderItems?.map((item, idx) => (
          <div key={idx}>
            <img src={item.image[0]} alt="" />
            <div>
              <h1>{item.name}</h1>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>{totalQuantity}</h2>
        <h2>{totalPrice}</h2>
        <h2>{overRawPrice}</h2>
      </div>
      <PaystackButton {...componentProps} />
    </div>
  );
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

export function getServerSideProps({ params }) {
  return { props: { params } };
}
