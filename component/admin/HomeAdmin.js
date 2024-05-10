import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styling/admin_home.module.scss';
import { useRouter } from "next/router";


const HomeAdmin = ({ order, users }) => {
  const [orderPay, setOrderPay] = useState(false);
  const pushToPage = useRouter();

  console.log(order);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.value;
    console.log(e.target.value);
    if (e.target.value) {
      setOrderPay(!orderPay);
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
            {order?.sort((a, b) => b.influencer === true).map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td className={styles.name}>{item.shippingAddress.fullName}</td>
                <td>{item.shippingAddress.phone}</td>
                <td>{item.shippingAddress.city}</td>
                <td>₦{item.overRawPrice?.toLocaleString('en-US')}</td>
                <td>
                  <form className={styles.toggleBody} value={item._id}>
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
                  {' '}
                  <button type="" onClick={() => pushToPage.push(`/user/order/${item._id}`)}>View Order</button>{' '}
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
              <th>Influencer</th>
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
                <td>{item.influencer ? "True" : "False"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeAdmin;
