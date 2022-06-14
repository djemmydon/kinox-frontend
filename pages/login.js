import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContex";
import styles from "../component/styling/register.module.scss";
import { getError } from "../lib/err";

function Login() {
  const {
    // state,
    dispatch,
  } = useStateContext();
  // const { userInfo } = state;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleSubmitLoginForm = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_USER", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
      toast.success(`Login Successfully `);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className={styles.container}>
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

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
