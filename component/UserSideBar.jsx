import React from "react";

function UserSideBar({ styles }) {
  return (
    <div className={styles.sideBarBody}>
      <ul>
        <li>Overview</li>
        <li>Orders</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default UserSideBar;
