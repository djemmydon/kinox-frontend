import React, { useState } from "react";
import { useStateContext } from "../context/StateContex";
import { PaystackButton } from "react-paystack";
import { toast } from "react-hot-toast";
import styles from "../component/styling/chechout.module.scss"
import { urlFor } from "../lib/client";
function Checkout() {
  const {
  
  } = useStateContext();

  const publicKey = "pk_test_9286738c5dddd1dd2a33753aaccc3383eb2ee96a";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount: 100,
    name,
    phone,
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
