import React, { useEffect, useState } from "react";
import styles from "./styling/placeorder.module.scss";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import * as fbq from "../lib/jspixel";
import { Country, State, City } from "country-state-city";
// import { getError } from "../lib/err";
import { client } from "../lib/client";
import PaystackHook from "./Paystack";
import { usePaystackPayment } from "react-paystack";

function OrderReview() {
  const { state, dispatch } = useStateContext();
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;


  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, [userInfo, router]);

  const [loading, setLoading] = useState(false);
  const [orderId, setorderId] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [countryList, setCountryList] = useState(null);
  const [stateList, setStateList] = useState(null);

  // Form data
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46\

  useEffect(() => {
    const calculate = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    setTotalPrice(calculate);
    console.log(orderId);
  }, [orderId, setorderId]);

  useEffect(() => {
    const fetchCountry = async () => {
      const data = Country.getAllCountries();
      const dataState = State.getAllStates();
      setCountryList(data);
      setStateList(dataState);
    };

    fetchCountry();
  }, [country]);

  // Check if their is coupon
  const isCoupon = async () => {
    setDiscountLoading(true);
    const data = await client.fetch(`*[_type == 'user' ]`);
    const check = data.find((item) => item.coupon === coupon);
    console.log(check, coupon)
    if (check?.coupon === coupon) {
      console.log(check);
      const calculate = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
      const percentage = calculate * 0.05
      setTotalPrice(calculate - percentage);
      toast.success(`${check.coupon} Coupon initiated`);

      setDiscountLoading(false);
    } else {
      toast.error(`${coupon} is not available`);
      setDiscountLoading(false);
    }
  };
// EMEKA123 EMEKA321
  const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);

  const shippingFee = totalPrice > 20000 ? 1000 : 0;

  const overRawPrice = totalPrice + shippingFee;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

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

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo?.email,
    amount: totalPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_TESTING,
  };

  // you can call this function anything

  const handlePayment = async () => {
    const data = {
      shippingAddress: {
        phone,
        fullName: `${firstName} ${lastName}`,

        address: address,
        zipcode,
        city,
        state: states,
        country,
      },
      firstName,
      totalQuantity,
      overRawPrice,
      coupon,
      userId: userInfo._id,
      email: userInfo.email,
      shippingFee,

      orderItems: cartItems.map((x) => ({
        ...x,
        inStock: undefined,
        slug: undefined,
      })),
    };
    console.log(data);
    setLoading(true);
    await axios
      .post(
        `/api/orders`,
        data,

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
          jsCookie.set("orderId");
          fbq.event("Purchase", { currency: "NGN", value: res.data.price });
          router.push(`/user/order/${res.data._id}`);
          setorderId(res.data?._id);

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
        <div className={styles.contactInformation}>
          <div className={styles.form}>
            <form action="">
              <h1>Delivery</h1>

              <div className={styles.formBody}>
                <div className={styles.formItem}>
                  <label htmlFor="">Country/Region</label>
                  <select
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor="">State</label>
                    <select
                      type="text"
                      value={states}
                      onChange={(e) => setStates(e.target.value)}
                    >
                      {stateList
                        ?.filter((item) => item.countryCode === country)
                        .map((item) => (
                          <option>{item.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor="">Zipcode</label>
                    <input
                      type="text"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="">Address</label>
                  <textarea
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className={styles.formName}>
                  <div className={styles.formItem}>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.orderDetails}>
          <div className={styles.products}>
            {cartItems.map((item) => (
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

          <div className={styles.formInput}>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Discount code"
            />
            <button onClick={isCoupon}>
              {discountLoading ? (
                <ClipLoader size={15} color="#fff" />
              ) : (
                "Apply"
              )}
            </button>
          </div>

          <div className={styles.totalPrice}>
            <div className={styles.totalItems}>
              <p>Subtotal</p>
              <span>₦{totalPrice}</span>
            </div>

            <div className={styles.totalItems}>
              <p>Shipping Fee</p>
              <span>₦{shippingFee}</span>
            </div>

            <div className={styles.totalItems}>
              <p>Total</p>
              <span>₦{overRawPrice}</span>
            </div>
          </div>

          <div className={styles.submitForm}>
            <button onClick={handlePayment}>Pay with Paystack</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(OrderReview), { ssr: false });
