import jsCookie from "js-cookie";
import React, { useEffect } from "react";
import styles from "../component/styling/register.module.scss";
import { useForm } from "react-hook-form";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { getError } from "../lib/err";

import axios from "axios";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { state, dispatch } = useStateContext();
  const { userInfo } = state;

  const router = useRouter();
  const {redirect} = router.query
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const HandleSubmitForm = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_USER", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push( "/");
      toast.success(`Login Successfully `);
    } catch (error) {
      toast.success(getError(error));
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(HandleSubmitForm)}>
        <div className={styles.formInput}>
          <label>Email</label>
          <input {...register("email", { required: true })} />
          {errors.email?.type === "required" && "email is required"}
        </div>

        <div className={styles.formInput}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && "Password name is required"}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
