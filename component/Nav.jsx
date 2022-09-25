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
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import styles from "./styling/nav.module.scss";
import { useStateContext } from "../context/StateContex";

import dynamic from "next/dynamic";
// import Search from "./Search";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // const [searchProduct, setSearchProduct] = useState([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const { state, dispatch } = useStateContext();
  const { cart, userInfo } = state;
  const router = useRouter();

  const handleNav = () => setOpenNav(!openNav);
  const handleSearch = () => setSearchOpen(!searchOpen);
  function handleClose() {
    setCartOpen(!cartOpen);
  }

  useEffect(() => {
    const fetChData = async () => {
      const res = await client.fetch("*[_type == 'product' ]");

      setData(res);
    };

    fetChData();
  }, []);

  const OnChangeHandler = (event) => {
    setValue(event.target.value);
    setSearchOpen(true);
  };

  const onSearchTerm = (searchTerm) => {
    console.log("search", searchTerm);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.flex_nav}>
          <div className={styles.nav_top}>
            <div className={styles.nav_logo}>
              <Link href="/">
                <Image src="/img/kinox_white.png" width={40} height={50} />
              </Link>
            </div>

            <div className={styles.nav_icon_menu}>
              <AiOutlineAlignRight
                size={25}
                color="white"
                onClick={handleNav}
              />
            </div>
          </div>

          <div className={styles.flexItems}>
            <div className={styles.nav_search}>
              <input
                type="text"
                value={value}
                id=""
                placeholder="Search here..."
                onChange={OnChangeHandler}
              />
              <button onClick={() => onSearchTerm(value)}>
                <AiOutlineSearch size={30} />
              </button>
            </div>

            <div className={styles.nav_icon}>
              <ul>
                {userInfo ? (
                  <li>
                    <AiOutlineUser color="white" size={25} />
                  </li>
                ) : (
                  <>
                    <li onClick={() => router.push("/login")}>
                      <AiOutlineLogin color="white" size={25} />
                      <span>Login</span>
                    </li>
                    <li onClick={() => router.push("/register")}>
                      <AiOutlineUserAdd color="white" size={25} />
                      <span>Register</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <AiOutlineSearch
              onClick={() => setSearchOpen(!searchOpen)}
              size={30}
              color="white"
              className={styles.search_mobile}
            />

            <div className={styles.cart}>
              <div className={styles.cart_box} onClick={handleClose}>
                <AiOutlineShoppingCart color="white" size={25} />
                <div className={styles.cart_count}>
                  <span>{cart.cartItems.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            openNav
              ? `${styles.nav_items} ${styles.nav_active}`
              : `${styles.nav_items}`
          }
        >
          <div className={styles.nav_menu}>
            <h2>Menu</h2>
            <AiOutlineClose color="white" size={25} onClick={handleNav} />
          </div>

          <ul>
            <li>
              <Link href="/">
                <a onClick={handleNav}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <a onClick={handleNav}>Shop</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/male">
                <a onClick={handleNav}>Male</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/female">
                <a onClick={handleNav}>Female</a>
              </Link>
            </li>
            <li>
              <Link href="/about-us">
                <a onClick={handleNav}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={handleNav}>Contact Us</a>
              </Link>
            </li>
          </ul>

          <div className={styles.nav_icon}>
            <ul>
              <li onClick={handleNav}>
                <AiOutlineUserAdd color="white" size={25} />
                <span onClick={() => router.push("/register")}>Register</span>
              </li>
              <li onClick={handleNav}>
                <AiOutlineLogin color="white" size={25} />
                <span onClick={() => router.push("/login")}>Login</span>
              </li>
            </ul>
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
        </div>

        {!data ? (
          <div>No Search Found</div>
        ) : (
          <div
            className={
              searchOpen
                ? `${styles.search_product} ${styles.search_active}`
                : `${styles.search_product}`
            }
          >
            <div className={styles.serchBody}>
              <div className={styles.search_inside}>
                <AiOutlineClose
                  className={styles.nav_cancel}
                  size={20}
                  onClick={() => setSearchOpen(false)}
                />

                <input
                  type="text"
                  value={value}
                  id=""
                  placeholder="Search here..."
                  onChange={OnChangeHandler}
                />
              </div>

              {data
                .filter((item) => {
                  const name = item.name.toLowerCase();
                  const searchTerm = value.toLowerCase();

                  return searchTerm && name.startsWith(searchTerm);
                })
                .slice(0, 9)
                .map((item) => (
                  <div key={item._id} className={styles.serchitem}>
                    <Link href={`/product/${item.slug.current}`}>
                      <a onClick={() => setSearchOpen(false)}>
                        <h2>{item.name}</h2>
                        <p>₦{item.price.toLocaleString()}</p>
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;

{
  /* <nav className={styles.nav}>
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
</nav> */
}

// const query = `*[_type == 'product' ]`;
// useEffect(() => {
//   const products = async () => {
//     const allProducts = await client.fetch(query);
//     setSearchProduct(allProducts);

//   };

//   const filterData = searchProduct.filter((coin) =>
//     coin.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   products();

//   setSearchProduct(filterData);
// }, [searchTerm, searchProduct]);
