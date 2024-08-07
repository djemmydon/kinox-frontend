import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useReducer, useEffect, useState } from "react";
import { useStateContext } from "../../../context/StateContex";
import { getError } from "../../../lib/err";
import { ClipLoader } from "react-spinners";
import { client } from "../../../lib/client";
import styles from "../../../component/styling/placeorder.module.scss";
import { Country, State } from "country-state-city";
import { usePaystackPayment } from "react-paystack";
import toast from "react-hot-toast";
import { Stepper } from "react-form-stepper";

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
  const [dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    order: {},
  });

  const { state } = useStateContext();
  const { userInfo } = state;
  const router = useRouter();
  // const [pay, setPay] = useState(false);
  // const [discountLoading, setDiscountLoading] = useState(false);

  const [delivered, setDelivered] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const [stateList, setStateList] = useState(null);

  const { id } = params;
  const [fetchData, setFetchData] = useState(null);

  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchCountry = async () => {
      const data = Country.getAllCountries();
      const dataState = State.getAllStates();
      setCountryList(data);
      setStateList(dataState);
    };

    fetchCountry();
  }, []);
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        const query = `*[_type == 'order' ]`;
        const categories = await axios.get(
          `https://jbcyg7kh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
        );
        const check = categories.data?.result.find(
          (item) => item._id === params.id
        );
        console.log(params);
        setFetchData(check);
        setFormData({ ...check?.shippingAddress });
      } catch (err) {
        // dispatch({ type: 'FAIL_REQUEST', payload: getError(err) });
        console.log(err);
      }
    };

    fetchOrder();
  }, [router, userInfo, id, params]);

  console.log(fetchData);

  const paidTransaction = async () => {
    const data = await client.fetch(`*[_type == 'order' ]`);
    const check = data.find((item) => item?._id === id);
    console.log(check);

    await axios
      .put("/api/orders/pay", {
        id: check._id,
        orderId: check._id,
        price: check.overRawPrice,
        fetchData
      })
      .then((res) => {
        toast.success("Payment Succefully");
        console.log(res);
        router.push("/user");
      });
  };
  const onSuccess = (reference) => {
    paidTransaction();
    console.log(reference);
    // setPay(true);
  };

  // you can call this function anything
  const onClose = () => {
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo?.email,
    amount: fetchData?.overRawPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_TESTING,
    // publicKey: "pk_live_f69a6a0f165b0b87afd826de08ac480a49ae5aa9",
  };

  const initializePayment = usePaystackPayment(config);

  const connectorStyleProps = {
    size: 2,
  };
  const ConnectStyleProps = {
    size: "1.5em",
  };

  const isDelivered = async () => {
    const data = await client.fetch(`*[_type == 'order' ]`);
    const check = data.find((item) => item?._id === id);
    console.log(check);

    client
      .patch(check._id)
      .set({ isDelivered: delivered })
      .commit()
      .then((res) => {
        toast.success("Delivered Succefully");
      });
    // await axios
    //   .put('/api/orders/delivered', {
    //     id: check._id,
    //     orderId: check._id,
    //   })
    //   .then((res) => {
    //     toast.success('Delivered Succefully');
    //     console.log(res);
    //     // router.push('/user');
    //   });
  };
  console.log(fetchData?.shippingFee);
  console.log(delivered);
  return (
    <main className={styles.placeorder}>
      {!fetchData ? (
        <div className={styles.loading}>
          <ClipLoader color="#8f0000" />
        </div>
      ) : (
        <div className={styles.placeorderFlex}>
          <div className={styles.orderDetails}>
            <div>
              <h1 style={{ fontSize: 20, marginLeft: 10 }}>
                Delivery Information
              </h1>
            </div>

            <div className={styles.products}>
              {fetchData?.orderItems.map((item) => (
                <div className={styles.productItem} key={item?._key}>
                  <div className={styles.productImage}>
                    <img src={item?.image} alt="" />
                    <div className={styles.productQuantity}>
                      <span>{item?.quantity}</span>
                    </div>
                  </div>
                  <div className={styles.productText}>
                    <p>{item?.name}</p>
                    <span>{item?.size} </span>
                  </div>
                  <div className={styles.productPrice}>
                    <p> ₦{item?.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totalPrice}>
              <div className={styles.totalItems}>
                <p>Subtotal</p>
                <span>₦{fetchData?.overRawPrice.toLocaleString()}</span>
              </div>

              <div className={styles.totalItems}>
                <p>Shipping Fee</p>
                <span>₦{!fetchData?.shippingFee <= 0 ? fetchData?.shippingFee.toLocaleString() : "0"}</span>
              </div>

              <div className={styles.totalItems}>
                <p>Total</p>
                <span>₦{fetchData?.overRawPrice.toLocaleString()}</span>
              </div>
              <div className={styles.totalItems}>
                <p>Status</p>
                <span>{fetchData?.isPaid ? "Paid" : "Not Paid"}</span>
              </div>
              <div className={styles.totalItems}>
                <p>Delivery</p>
                <span>{fetchData?.isDelivered ? "Delivered" : "Not Delivered"}</span>
              </div>
            </div>

            <div className={styles.submitForm}>
              {fetchData?.isPaid ? null : (
                <button
                  onClick={() => {
                    initializePayment(onSuccess, onClose);
                  }}
                >
                  Pay ₦{fetchData?.overRawPrice.toLocaleString()}
                </button>
              )}
            </div>

            {userInfo?.isAdmin && (
              <div style={{ marginLeft: 10 }}>
                <h2 style={{ fontSize: 15, paddingTop: 10, paddingBottom: 10 }}>
                  Delivery Status
                </h2>
                <select
                  style={{ height: 40, width: "100%" }}
                  value={delivered}
                  onChange={(e) => setDelivered(e.target.value)}
                >
                  <option value="false">Not Delivered</option>

                  <option value="true">Delivered</option>
                </select>

                {delivered && (
                  <button
                    onClick={isDelivered}
                    style={{
                      height: 40,
                      width: 150,
                      backgroundColor: "red",
                      color: "white",
                      marginTop: 15,
                      width: "100%",
                    }}
                  >
                    Confirm
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={styles.contactInformation}>
            <div className={styles.form}>
              <form action="">
                <h1>Delivery Information</h1>

                <div className={styles.formBody}>
                  <div className={styles.formItem}>
                    <label htmlFor="">Country/Region</label>
                    <select
                      type="text"
                      name="country"
                      value={formData?.country}
                      onChange={handleChange}
                    >
                      {countryList?.map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formLocation}>
                    <div className={styles.formItem}>
                      <label htmlFor="">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData?.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formItem}>
                      <label htmlFor="">State</label>
                      <select
                        type="text"
                        name="state"
                        value={formData?.state}
                        onChange={handleChange}
                      >
                        {stateList
                          ?.filter(
                            (item) => item.countryCode === formData?.country
                          )
                          .map((item) => (
                            <option key={item.name}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                    <div className={styles.formItem}>
                      <label htmlFor="">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData?.zipcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor="">Address</label>
                    <textarea
                      type="text"
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData?.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formItem}>
                    <label htmlFor="">Full Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData?.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

export function getServerSideProps({ params }) {
  return { props: { params } };
}
