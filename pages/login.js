import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContex";
import styles from "../component/styling/register.module.scss";
import { getError } from "../lib/err";
import Link from "next/link";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import { FaRegEye } from "react-icons/fa";

function Login() {
  const {
    // state,
    dispatch,
  } = useStateContext();
  // const { userInfo } = state;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleSubmitLoginForm = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_USER", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
      toast.success(`Login Successfully `);
      setLoading(false);
    } catch (error) {

      toast.error(getError(error));
      setLoading(false)
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kinox | Login</title>

        <meta
          name="description"
          content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flex_form}>
        <div className={styles.login}>
          <div className="headings">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit(HandleSubmitLoginForm)}>
            <div className={styles.formInput}>
              <label>Email</label>
              <input {...register("email", { required: true })} />
              <span>
                {errors.email?.type === "required" && "email is required"}
              </span>
            </div>

            <div className={styles.formInput}>
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              <span>
                {errors.password?.type === "required" &&
                  "Password name is required"}
              </span>
            </div>

            <button type="submit">
              {loading ? <ClipLoader color="white" size={20} /> : "Submit"}
            </button>
          </form>
        </div>
        <h4>
          Not have an account
          <Link href="/register">Sign up here</Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
