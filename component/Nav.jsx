import React, { useState } from "react";
import Cart from "./Cart";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import styles from "./styling/nav.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [closeNav, setCloseNav] = useState(false);

  const handleNav = () => setOpenNav(!openNav);
  const handleClose = () => setOpenNav(!openNav);


  

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <div className={styles.nav_items}>
          <div className={styles.nav_logo}>
            <Link href="/">
              <a>
                <Image src="/img/kinox RED.png" width={30} height={40} />
              </a>
            </Link>
          </div>
       
        </div>
   <div className={openNav ? styles.nav_active : styles.nav_link}>
            {/* <div className={styles.nav_close_icon}>
          <AiOutlineSearch  className={styles.nav_icon} size={30} onClick={handleClose} />

          </div> */}
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
          <AiOutlineSearch className={styles.nav_icon} size={20} />
          <AiOutlineShoppingCart className={styles.nav_icon} size={20} />
          <GiHamburgerMenu
            className={styles.nav_icon_menu}
            size={20}
            onClick={handleNav}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
