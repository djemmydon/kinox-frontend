import React, { useState } from "react";
import { useStateContext } from "../context/StateContex";
import { PaystackButton } from "react-paystack";
import { toast } from "react-hot-toast";
import styles from "../component/styling/chechout.module.scss"
import { urlFor } from "../lib/client";
function Checkout() {
  const {
    cartItems,
    totalQuantity,
    toggleCartItemQuanitity,
    totalPrice,
    setCartItems,
  } = useStateContext();

  const publicKey = "pk_test_9286738c5dddd1dd2a33753aaccc3383eb2ee96a";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount: totalPrice * 100,
    name,
    phone,
    product: cartItems,
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),

    onClose: () => alert("Wait! Don't leave :("),
  };
  return (
    <div>
      <div className={styles.checkout_page}>
        <div className={styles.checkout_flex}>


        <div className={styles.checkout_item}>
        {cartItems?.length >= 1 &&
        cartItems?.map((item, index) => (
          <div key={index} className={styles.ProductDetail}>
            <div>
              {/* <img src={urlFor(item.image[0])} alt="" /> */}
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
          </div>
        ))}
        </div>


          <div className={styles.checkout_form}>
            <div className={styles.checkout_field}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.checkout_field}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.checkout_field}>
              <label>Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          
            <PaystackButton {...componentProps} />
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default Checkout;
