import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../component/styling/register.module.scss";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
function Shipping() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useStateContext();
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("./register?redirect=/shipping");

      setValue("fullName", shippingAddress.fullName);
      setValue("address1", shippingAddress.address1);
      setValue("address2", shippingAddress.address2);
      setValue("phone", shippingAddress.phone);
      setValue("country", shippingAddress.country);
      setValue("zipCode", shippingAddress.zipCode);
    }
  }, [router, setValue, userInfo, shippingAddress]);
  const HandleSubmitForm = ({
    fullName,
    address1,
    address2,
    phone,
    zipCode,
    city,
    country,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address1, address2, phone, zipCode, city, country },
    });

    jsCookie.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address1,
        address2,
        phone,
        zipCode,
        city,
        country,
      })
    );

    router.push("/placeorder")
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(HandleSubmitForm)}>
        <div className={styles.formInput}>
          <label>Full Name</label>
          <input type="text" {...register("fullName", { required: true })} />
          {errors.fullName?.type === "required" && "email is required"}
        </div>

        <div className={styles.formInput}>
          <label>Phone Number</label>
          <input type="tel" {...register("phone", { required: true })} />
          {errors.phone?.type === "required" && "Password name is required"}
        </div>

        <div className={styles.formInput}>
          <label>Address 1</label>
          <textarea {...register("address1", { required: true })} />
          {errors.address1?.type === "required" && "Password name is required"}
        </div>

        <div className={styles.formInput}>
          <label>Address 2</label>
          <textarea type="text" {...register("address2", { required: true })} />
          {errors.address2?.type === "required" && "Password name is required"}
        </div>

        <div className={styles.formInput}>
          <label>City</label>
          <input type="text" {...register("city", { required: true })} />
          {errors.city?.type === "required" && "Password name is required"}
        </div>

        <div className={styles.formInput}>
          <label>Country</label>
          <input type="text" {...register("country", { required: true })} />
          {errors.country?.type === "required" && "Password name is required"}
        </div>
        <div className={styles.formInput}>
          <label>Zip Code</label>
          <input type="number" {...register("zipCode", { required: true })} />
          <span>
            {" "}
            {errors.zipCode?.type === "required" && "Zip code is required"}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default Shipping;
