import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineAlignRight,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineUserAdd
} from "react-icons/ai";
import styles from "./styling/nav.module.scss";

import { useStateContext } from "../context/StateContex";

import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./Cart"), {ssr: false})

function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { state, dispatch } = useStateContext();
  const {cart, userInfo} = state


  const handleNav = () => setOpenNav(!openNav);
  const handleClose = () => setCartOpen(!cartOpen);

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
        <div className={openNav ? styles.nav_active : styles.nav_link}>
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
            <a>Product</a>
          </Link>
          <Link href="/#">
            <a>About</a>
          </Link>
          <Link href="/#">
            <a>Contact</a>
          </Link>
        </div>

        <div className={styles.nav_icons}>
          <AiOutlineSearch className={styles.nav_icon} size={25} />

          <AiOutlineShoppingCart
            onClick={handleClose}
            className={styles.nav_icon}
            size={25}
          />
          <span>{cart.cartItems.length}</span>


    

          {userInfo ? (<AiOutlineUser
            onClick={handleClose}
            className={styles.nav_icon}
            size={25}
          />) : (<AiOutlineUserAdd
            onClick={handleClose}
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
      <div className={cartOpen ? styles.carts_active : styles.carts}>
        <AiOutlineClose
          className={styles.nav_cancel}
          size={40}
          onClick={handleClose}
        />

        <Cart />
      </div>
    </nav>
  );
}

export default Nav;
