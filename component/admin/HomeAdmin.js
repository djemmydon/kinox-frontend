import Link from "next/link";
import React, { useState } from "react";
import styles from "../styling/admin_home.module.scss";

const HomeAdmin = ({ order, users }) => {
  const [orderPay, setOrderPay] = useState(false);

  console.log(orderPay)

  const handleClick = (e) => {
    e.preventDefault();
    e.target.value
    console.log(e.target.value);
       if(e.target.value) {
        setOrderPay(!orderPay)
       }
  };
  return (
    <div className={styles.body}>
      <div className={styles.orders}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th className={styles.name}>User_Name</th>
              <th>Phone Number</th>
              <th>User Location</th>
              <th>Order Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td className={styles.name}>{item.shippingAddress.fullName}</td>
                <td>{item.shippingAddress.phone}</td>
                <td>{item.shippingAddress.city}</td>
                <td>₦{item.totalPrice.toLocaleString("en-US")}</td>
                <td>
                  <form className={styles.toggleBody} value={item._id} >
                    <button
                    value={item._id}
                    onClick={handleClick}
                      className={
                        item._id
                          ? `${styles.toggle}  ${styles.active}`
                          : `${styles.toggle}`
                      }
                    ></button>
                  </form>
                </td>
                <td>
                  {" "}
                  <button type="">View Order</button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.orders}>
        <table>
          <thead>
            <tr>
              <th>User_Id</th>
              <th>User_Name</th>
              <th>User_Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeAdmin;
