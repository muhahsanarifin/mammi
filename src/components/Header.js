import React from "react";

import { Link } from "react-router-dom";

import styles from "../styles/Header.module.css";

import mammiLogo from "../assets/images/mammi-logo.png";

import searchIcon from "../assets/icons/search.svg";

import chat from "../assets//icons/chat.svg";

const Header = ({
  LinktoHome,
  LinktoProducts,
  LinktoYourcart,
  LinktoHistory,
  LinktoProfile,
  Avatar,
  value,
  onChange,
  onSubmit,
}) => {
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
        <Link to={LinktoHome}>Home</Link>
        <Link to={LinktoProducts}>Product</Link>
        <Link to={LinktoYourcart}>YourCart</Link>
        <Link to={LinktoHistory}>History</Link>
      </nav>
      <div className="d-flex flex-row gap-4  align-items-center">
        {/* <span className={styles.search}>
          <img src={searchGray} alt="search" />
        </span> */}
        <span className={styles.search} onSubmit={onSubmit}>
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
          />
        </span>
        <span className={styles.chat}>
          <img src={chat} alt="chat" />
        </span>
        <span className={styles.avatar}>
          <Link to={LinktoProfile}>
            <img src={Avatar} alt="Avatar" />
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
