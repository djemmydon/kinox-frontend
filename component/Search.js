import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { useStateContext } from "../context/StateContex";
import { Product } from "./Product";

const prices = [
  {
    name: "$1 to $50",
    value: "4000-5000",
  },
  {
    name: "$51 to $200",
    value: "10000-20000",
  },
];

function Search() {
  const router = useRouter();
  const {
    state: { cart },
    dispatch,
  } = useStateContext();

  const { category = "", sort = "", query = "all", price = "" } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: " ",
    loading: true,
  });

  const { products, error, loading } = state;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch("*[_type == 'category' ]");
        setCategories(data);
        console.log(data[0].title);
      } catch (error) {}
    };


    fetchCategories();

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product"';
        if (category != "all") {
          gQuery += `&& category match "${category}" `;
        }

        if (query !== "all") {
          gQuery += ` && name match "${query}" `;
        }

        if (price !== "all") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }

        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        gQuery += `] ${order}`;
        setState({ loading: true });

        const products = await client.fetch(gQuery);
        setState({ products, loading: false });
        console.log(products)
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };

    fetchData();
  }, [category, price, query, sort]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  return (
    <div>
      <select onChange={categoryHandler}>
        <option value="All">All</option>
        {categories.map((item) => (
          <option value={item.title} key={item._id}>
            {" "}
            {item.title}
          </option>
        ))}
      </select>

      <select onChange={priceHandler}>
        <option value="All">All</option>
        {prices.map((item) => (
          <option value={item.title} key={item._id}>
            {" "}
            {item.value}
          </option>
        ))}
      </select>

      <div>
        {products && products.length !== 0 ? products.length : "No"} Results
        {query !== "all" && query !== "" && " : " + query}
        {price !== "all" && " : Price " + price}
        {(query !== "all" && query !== "") || price !== "all" ? (
          <button onClick={() => router.push("/search")}>X</button>
        ) : null}
      </div>

      <div>
        {/* {product.map((product) => (
            <Product product={product}/>
        ))} */}
      </div>
    </div>
  );
}

export default Search;
