import React from "react";
import Link from "next/link";
import styles from "../component/styling/404.module.scss";

function Custom404() {
  return (
    <div className={styles.custom}>
      <h1>404</h1>
      <p>Sorry, Page Not Found</p>

      <Link href="/">
        <a>Go Back To Home Page</a>
      </Link>
    </div>
  );
}

export default Custom404;
