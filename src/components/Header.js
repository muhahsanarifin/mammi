import React from "react";

import { Link } from "react-router-dom";

import styles from "../styles/Header.module.css";

import coffeeLogo from "../assets/images/coffee-logo.svg";

import searchGray from "../assets/icons/search-gray.svg";

import chat from "../assets//icons/chat.svg";

const Header = (props) => {
  return (
    <header
      className={`${styles.header} d-flex justify-content-evenly align-items-center`}
    >
      <div className={styles["header__logo"]}>
        <span className={styles["header__logo__image"]}>
          <img src={coffeeLogo} alt="mammi-logo" />
        </span>
        <span className={styles["header__logo__init"]}>
          <p>MAMMI</p>
        </span>
      </div>
      <nav className={`d-flex flex-row gap-5 ${styles.navbar}`}>
        <Link to={props.LinktoHome}>Home</Link>
        <Link to={props.LinktoProducts}>Product</Link>
        <Link to={props.LinktoYourcart}>YourCart</Link>
        <Link to={props.LinktoHistory}>History</Link>
      </nav>
      <div className="d-flex flex-row gap-4">
        <span className={styles.search}>
          <img src={searchGray} alt="search" />
        </span>
        <span className={styles.chat}>
          <img src={chat} alt="chat" />
        </span>
        <span className={styles.avatar}>
          <Link to={props.LinktoProfile}>
            <img src={props.Avatar} alt="Avatar" />
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
