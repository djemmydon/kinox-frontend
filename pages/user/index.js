import React from "react";

import styles from "../../component/styling/user.module.scss";
import UserSideBar from "../../component/UserSideBar";
import UserHomeDash from "../../component/UserHomeDash";
import { useStateContext } from "../../context/StateContex";
import { client } from "../../lib/client";


function Index({ products }) {
  const { state } = useStateContext();
  const {
    userInfo,

  } = state;

  console.log(products)
  return (
    <div className={styles.userBody}>
      <div className={styles.sideBar}>
        <UserSideBar styles={styles} />
      </div>
      <div className={styles.mainContent}>
        <UserHomeDash user={userInfo} order={products}  styles={styles} />
      </div>
    </div>
  );
}

export default Index;
export const getServerSideProps = async () => {
  const query = `*[_type == 'order' ]`;

  const products= await client.fetch(query);
  // const products = product.filter((item) => item.coupon);

  return {
    props: {
      products,
    },
  };
};
