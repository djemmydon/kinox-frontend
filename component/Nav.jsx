import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineAlignRight,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import styles from "./styling/nav.module.scss";

import { useStateContext } from "../context/StateContex";

import dynamic from "next/dynamic";
import Search from "./Search";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useStateContext();
  const { cart, userInfo, products } = state;
  const router = useRouter();

  console.log(products);

  const handleNav = () => setOpenNav(!openNav);
  const handleSearch = () => setSearchOpen(!searchOpen);
  function handleClose() {
    setCartOpen(!cartOpen);
  }

  const query = `*[_type == 'product' ]`;
  useEffect(() => {
    const products = async () => {
      const allProducts = await client.fetch(query);
      setSearchProduct(allProducts);
      console.log(allProducts);
    };

    const filterData = searchProduct.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    products();

    setSearchProduct(filterData);
  }, [searchTerm, searchProduct]);

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <div className={styles.nav_items}>
          <div className={styles.nav_logo}>
            <Link href="/">
              <a>
                <Image src="/img/kinox_white.png" width={30} height={40} />
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.nav_link}>
          <AiOutlineClose
            className={styles.nav_cancel}
            color="white"
            size={40}
            onClick={handleNav}
          />

          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/products">
            <a>Shop</a>
          </Link>

          <Link href="/categories/male">
            <a>Male</a>
          </Link>

          <Link href="/categories/female">
            <a>Female</a>
          </Link>

          <Link href="/about-us">
            <a>About</a>
          </Link>
          <Link href="/#">
            <a>Contact</a>
          </Link>
        </div>

        <div
          className={openNav ? styles.backdrop : " "}
          onClick={handleNav}
        ></div>

        <div className={openNav ? styles.nav_active : styles.nav_mobile_link}>
          <AiOutlineClose
            className={styles.nav_cancel}
            color="white"
            size={40}
            onClick={handleNav}
          />

          <Link href="/">
            <a onClick={handleNav}>Home</a>
          </Link>

          <Link href="/products">
            <a onClick={handleNav}>Shop</a>
          </Link>

          <Link href="/categories/male">
            <a onClick={handleNav}>Male</a>
          </Link>

          <Link href="/categories/female">
            <a onClick={handleNav}>Female</a>
          </Link>
          <Link href="/about-us">
            <a onClick={handleNav}>About</a>
          </Link>
          <Link href="/#">
            <a onClick={handleNav}>Contact</a>
          </Link>
        </div>

        <div className={styles.nav_icons}>
          <AiOutlineSearch
            className={styles.nav_icon}
            size={25}
            onClick={handleSearch}
          />


    <div    className={styles.amount}>
                <AiOutlineShoppingCart
            onClick={handleClose}
            className={styles.nav_icon}
            size={25}
          />
          <span>{cart.cartItems.length}</span>

    </div>

          {userInfo ? (
            <AiOutlineUser className={styles.nav_icon} size={25} />
          ) : (
            <AiOutlineUserAdd
              onClick={() => router.push("/register")}
              className={styles.nav_icon}
              size={25}
            />
          )}

          <AiOutlineAlignRight
            className={styles.nav_icon_menu}
            size={25}
            onClick={handleNav}
          />
        </div>
      </div>
      <div className={styles.cartBody}>
        <div className={cartOpen ? styles.carts_active : styles.carts}>
          <AiOutlineClose
            className={styles.nav_cancel}
            size={40}
            onClick={handleClose}
          />

          <Cart data={handleClose} />
        </div>
        <div
          className={cartOpen ? styles.backdrop : " "}
          onClick={handleClose}
        ></div>
      </div>

      <div className={searchOpen ? styles.search_active : styles.search}>
        <div>
          <input
            type="text"
            placeholder="Search for products"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div>
          {searchProduct.map((item, idx) => (
            <Search key={idx} items={item} />
          ))}
        </div>

        
      </div>
    </nav>
  );
}

export default Nav;
