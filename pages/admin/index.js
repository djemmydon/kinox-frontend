import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HomeAdmin from '../../component/admin/HomeAdmin';
import { useStateContext } from '../../context/StateContex';
import { client } from '../../lib/client';
import axios from 'axios';

function Admin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const { state } = useStateContext();
  const { userInfo } = state;

  const router = useRouter();
  console.log(userInfo);

  useEffect(() => {
    const query = `*[_type == 'order' ]`;
    const query2 = `*[_type == 'user' ]`;

    const fetchData = async () => {
      const categories = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
      );
      setOrders(categories.data.result);
      console.log(categories.data)


      const review = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v1/data/query/production?query=${query2}`
      );
      setUsers(review.data.result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push('/');
    }
  }, [userInfo, router]);

  return (
    <div>
      <HomeAdmin order={orders} users={users} />
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
