import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HomeAdmin from "../../component/admin/HomeAdmin";
import { useStateContext } from "../../context/StateContex";
import { client } from "../../lib/client";


function Admin({orders, users}) {
  const { state } = useStateContext();
  const {  userInfo } = state;

  const router = useRouter();
  console.log(userInfo);

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push("/");
    }
  }, [userInfo, router]);

  return (
    <div>
      <HomeAdmin order={orders}users={users}/>
   
    </div>
  );
}

export default Admin;


export const getServerSideProps = async () => {
    const query = `*[_type == 'order' ]`;
    const query2 = `*[_type == 'user' ]`;
  
    const orders = await client.fetch(query);
    const users = await client.fetch(query2);
  
    return {
      props: {
        orders,
        users,
      },
    };
  };
  