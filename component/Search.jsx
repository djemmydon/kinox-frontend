import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useStateContext } from "../context/StateContex";
import { client } from "../lib/client";

function Search() {
  const router = useRouter();
  const {
    category = "search",
    query = "all",
    prices = "all",
    sort = "default",
  } = router.query;

  const { state, dispatch } = useStateContext();
  const { loading, error, products, userInfo } = state;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const { fetch } = await client.fetch(`*[_type == 'category' ]`);
      setCategories(fetch);
      console.log(fetch);
    };

    fetchCategory();
  }, []);

  return <div>dd</div>;
}

export default Search;
