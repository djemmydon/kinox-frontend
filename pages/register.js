import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContex";
import styles from "../component/styling/register.module.scss";
import { getError } from "../lib/err";

function Register() {
  const { state, dispatch } = useStateContext();
  const { userInfo } = state;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleSubmitForm = async ({ firstName, lastName, email, password }) => {
    try {
      const { data } = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: "REGISTER_USER", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
      toast.success(`Register Successfully `);
    } catch (err) {
      toast.error(getError(err));
    }
  };

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
      toast.success(getError(error));
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
              <span>{errors.email?.type === "required" && "email is required"}
            </span></div>

            <div className={styles.formInput}>
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              <span>{errors.password?.type === "required" &&
                "Password name is required"}</span>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>

        
       
        <div className={styles.register}>
        <div className="headings">
          <h1>Register</h1>
        </div>       
          <form onSubmit={handleSubmit(HandleSubmitForm)}>
        

            <div className={styles.formInput}>
              <label>First Name</label>
              <input {...register("firstName", { required: true })} />
              <span>{errors.firstName?.type === "required" &&
                "First name is required"}</span>
            </div>
            <div className={styles.formInput}>
              <label>Last Name</label>
              <input {...register("lastName", { required: true })} />
              <span>{errors.lastName?.type === "required" && "Last name is required"}</span>
            </div>

            <div className={styles.formInput}>
              <label>Email</label>
              <input type="email" {...register("email", { required: true })} />
              <span>{errors.email?.type === "required" && "email is required"}</span>
            </div>

            <div className={styles.formInput}>
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              <span>{errors.password?.type === "required" &&
                "Password name is required"}</span>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>

      
      </div>
    </div>
  );
}

export default Register;
