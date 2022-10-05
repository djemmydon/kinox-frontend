import { useForm, ValidationError } from "@formspree/react";
import styles from "./styling/contact.module.scss";
import {
  // AiOutlineMail,
  // AiOutlinePhone,
  // AiFillTwitterCircle,
  AiOutlineInstagram,
  // AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import HomePopPup from "./pop/HomePopPup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function ContactForm() {
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

//   const popUpHandler = () => {
//     setPopUp(false);
//   };

  const [state, handleSubmit] = useForm("xknebywv");

  useEffect(() => {
    if (state.succeeded) {
      return setPopUp(true);
    }
  }, [state]);

  return (
    <div>
      <HomePopPup
        trigger={popUp}
        title="Thank You For Contacting Us ?"
        title2=" We are Going To Get Back To You Shortly"
        button="Go Back Home"
        link="/"
      />
      <div className="headings">
        <h1>Contact Us</h1>
      </div>
      <div className={styles.contactBody}>
        <div className={styles.socialS}>
          <div>
            {" "}
            <p>Opposite Emmanuel Baptist Church, Agodi Gate, Ibadan Nigeria,</p>
            <span>Monday-Saturday | 9:00 am-5pm </span>
            <a
              href="tel:+2347025235337
"
            >
              +2347025235337
            </a>
            <br />
            <a href="mail:kinoxapparel@gmail.com">kinoxapparel@gmail.com</a>
          </div>
          <div className={styles.grid}>
            <h1>Follow Us</h1>

            <div className={styles.icons}>
              <a href="https://www.instagram.com/kinox_original/">
                <AiOutlineInstagram color="#ff0000" size={30} />
              </a>
              <a href="https://web.facebook.com/profile.php?id=100077430279506">
                <AiOutlineFacebook color="#ff0000" size={30} />
              </a>
              <a href="https://twitter.com/kinoxapparel">
                <AiOutlineTwitter color="#ff0000" size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.formBody}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formItem}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" />
              <ValidationError
                prefix="Email"
                field="name"
                errors={state.errors}
              />
            </div>

            <div className={styles.formItem}>
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" name="email" />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <div className={styles.formItem}>
              <label htmlFor="email">Your Message</label>

              <textarea id="message" name="message" />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <div className={styles.formItem}>
              <button type="submit" disabled={state.submitting}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
