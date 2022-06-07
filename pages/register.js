import React, {  useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContex";
import styles from '../component/styling/register.module.scss'
import { getError } from "../lib/err";

function Register() {
  const { state, dispatch } = useStateContext();
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleSubmitForm = async ({firstName, lastName, email, password}) => {
    try {
      const { data } = await axios.post('/api/users/register', {
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

  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit(HandleSubmitForm)}>
      <h2>Register</h2>
        <div className={styles.formInput}>
          <label>First Name</label>
          <input {...register("firstName", { required: true })} />
          {errors.firstName?.type === "required" && "First name is required"}
        </div>
        <div className={styles.formInput}>
          <label>Last Name</label>
          <input {...register("lastName", { required: true })} />
          {errors.lastName?.type === "required" && "Last name is required"}
        </div>

        <div className={styles.formInput}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email?.type === "required" && "email is required"}
        </div>

        <div className={styles.formInput}>
          <label>Password</label>
          <input type="password" {...register("password", { required: true  })} />
          {errors.password?.type === "required" && "Password name is required"}
        </div>
       


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
