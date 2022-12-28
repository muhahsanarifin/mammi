import React from "react";
import { Link } from "react-router-dom";

import mammiLogo from "../assets/images/mammi-logo.png";
import searchIcon from "../assets/icons/search.svg";
import chat from "../assets/icons/chat.svg";
import styles from "../styles/Header.module.css";

const Header = ({
  value,
  onChange,
  onSubmit,
}) => {
  const picture = localStorage.getItem("picture");
  const accessToken = localStorage.getItem("token");

  return (
    <header
      className={`${styles.header} d-flex justify-content-evenly align-items-center`}
    >
      <div className={styles["header__logo"]}>
        <span className={styles["header__logo__image"]}>
          <img src={mammiLogo} alt="mammi-logo" />
        </span>
        <span className={styles["header__logo__init"]}>
          <p>MAMMI</p>
        </span>
      </div>
      <nav className={`d-flex flex-row gap-4 ${styles.navbar}`}>
        <Link to={`/`}>Home</Link>
        <Link to={`/products`}>Product</Link>
        <Link to={`/order`}>YourCart</Link>
        <Link to={`/history`}>History</Link>
      </nav>
      <div className="d-flex flex-row gap-4  align-items-center">
        <span className={styles.search} onSubmit={onSubmit}>
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
          />
        </span>
        {accessToken ? (
          <>
            <span className={styles.chat}>
              <img src={chat} alt="chat" />
            </span>
            <span className={styles.avatar}>
              <Link to={`/profile`}>
                <img src={picture} alt={picture} />
              </Link>
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
