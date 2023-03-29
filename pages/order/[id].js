import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useReducer, useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContex";
import { getError } from "../../lib/err";
import styles from "../../component/styling/placeorder.module.scss";
import OrderPaid from "../../component/pop/OrderPaid";
import PaystackHook from "../../component/Paystack";
import { ClipLoader } from "react-spinners";

// import { IoCheckmarkDoneCircle } from "react-icons/io";
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
    overRawPrice,
    // isPaid,
    // paidAt,
    totalQuantity,
    // isDelivered,
    // deliveredAt,
    // createdAt,
  } = order;

  const { state } = useStateContext();
  const { userInfo } = state;
  const { router } = useRouter();
  const [pay, setPay] = useState(false);
  const { id } = params;
  const [fetchData, setFetchData] = useState();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://kinox-backend.vercel.app/api/v1/order/${id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "SUCCESS_REQUEST", payload: data });
        console.log(data);
        setFetchData(data);
      } catch (err) {
        dispatch({ type: "FAIL_REQUEST", payload: getError(err) });
      }
    };

    if (!order._id) {
      fetchOrder();
    }
  }, [router, order, userInfo, id]);

  console.log(fetchData);
  return (
    <div>
      <main className={styles.placeorder}>
        {!fetchData ? (
          <div className={styles.loading}>
            <ClipLoader color="red" size={50} />
          </div>
        ) : (
          <div className={styles.placeorderFlex}>
            <div className={styles.shippingaddress}>
              <h2>Billing Address</h2>

              <h5>
                Full Name:{" "}
                <span>
                  {order.firstName} {order.lastName}
                </span>{" "}
              </h5>
              <h5>
                Phone: <span>{order.shippingAddress}</span>{" "}
              </h5>
              <h5>
                Address1: <span>{order.shippingAddress}</span>
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

                {fetchData?.order?.map((item, idx) => (
                  <div className={styles.product} key={idx}>
                    <img src={item.image} />

                    <div>
                      <h1>{item.name}</h1>
                      <p>Price: ₦{item.price}</p>
                    </div>

                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.checkout}>
              <h1>
                Total Quantity : <span>{totalQuantity}</span>{" "}
              </h1>
              <h1>
                Shipping Fee: <span> ₦{shippingFee}</span>
              </h1>

              <h1>
                Products Price : <span>₦{totalPrice}</span>{" "}
              </h1>
              <h1>
                Total Price : <span>₦{overRawPrice}</span>{" "}
              </h1>

              {/* <PayWithFlutterwave
                total={totalPrice}
                shipping={shippingAddress}
                user={userInfo}
                order={order}
                setPay={setPay}
            /> */}

              <PaystackHook
                total={totalPrice}
                shipping={shippingAddress}
                user={userInfo}
                setPay={setPay}
              />
            </div>
          </div>
        )}

        {pay && <OrderPaid pay={pay} src="/icons/rider.gif" />}
      </main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

export function getServerSideProps({ params }) {
  return { props: { params } };
}
