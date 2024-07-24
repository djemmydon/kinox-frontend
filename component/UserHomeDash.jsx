import React from "react";
import { AiOutlineShoppingCart, AiOutlineCopy } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

function UserHomeDash({ styles, user, order }) {
  const adminShow = user?.isAdmin ? order : order?.filter((item) => item?.user._ref === user?._id);
  console.log(adminShow)

  //  Search for user that is influencer
  const calculate =
    order.filter((item) => item?.coupon === user?.coupon && item?.isPaid === true).length * 1500;
  const totalOrderForInfluencer = order.filter(
    (item) => item?.coupon === user?.coupon && item?.isPaid === true
  ).length;

  console.log(calculate);
  const pushToPage = useRouter();
  return (
    <div>
      <div className={styles.homePage}>
        <h1>
          {user?.firstName} {user?.lastName}
        </h1>
        <p>okinopatrick0@gmail.com</p>
      </div>

      <h1 className={styles.headerOverview}>Overview</h1>

      {user?.influencer && (
        <div className={styles.homeCard}>
          <div className={styles.card}>
            <GiTakeMyMoney color="#fff" size={60} />

            <div className={styles.cardText}>
              <h2>₦{calculate.toLocaleString()}</h2>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className={styles.card}>
            <AiOutlineShoppingCart color="#fff" size={60} />
            <div className={styles.cardText}>
              <h2>{totalOrderForInfluencer}</h2>
              <p>Total Orders</p>
            </div>
          </div>
          <div className={styles.card}>
            <AiOutlineCopy color="red" size={60} />
            <div className={styles.cardText}>
              <h2>EMEKA321</h2>
              <p>Coupon Code</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.orderContent}>
        <h1>Your Orders({adminShow?.length})</h1>

        <div className={styles.orderBody}>
          {adminShow.map((item) => (
            <div key={item?._id} className={styles.orderItem}>
              <div className={styles.orderItemHead}>
                <div className={styles.orderId}>
                  <h6>
                    Status:
                    {order?.status ? "Completed" : "Pending"}
                  </h6>
                  <h6>Order ID: {item?._id}</h6>
                  <p>
                    Date:{" "}
                    {moment(item._createdAt).format("MMM YYYY ddd, h:mm:ss a")}
                  </p>
                </div>

                <div className={styles.buttonBody}>
                  <button>Cancel Order</button>
                  <button
                    onClick={() => pushToPage.push(`/user/order/${item?._id}`)}
                  >
                    Track Order
                  </button>
                </div>
              </div>

              <div className={styles.orderContact}>
                <div>
                  <h2>Contact</h2>

                  <span>
                    Name {item?.shippingAddress.fullName} 
                  </span>
                  <span>Phone: {item?.shippingAddress.phone}</span>
                  <span>Email: okinopatrick@gmail.com</span>
                </div>
                <div>
                  <div>
                    <h2>Delivery Address</h2>

                    <span>Country: {item?.shippingAddress.country}</span>
                    <span>City: {item?.shippingAddress.city}</span>
                    <span>Address: {item?.shippingAddress.address} </span>
                    <span>Zip Code: {item?.shippingAddress.zipcode}</span>
                  </div>
                </div>
              </div>

              <div className={styles.orderProduct}>
                {item.orderItems.map((items) => (
                  <div className={styles.orderProductItem}>
                    <img src={items?.image} alt="" />

                    <div>
                      <p>{items?.name}</p>
                      <span>
                        {items?.size} | ₦{items?.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHomeDash;
