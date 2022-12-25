import React from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

import mammiLogo from "../../assets/images/mammi-logo.png";

import searchIcon from "../../assets/icons/search.svg";

import chat from "../../assets/icons/chat.svg";

import styles from "../../styles/admin/Header.module.css";

const Header = ({
  LinktoHome,
  LinktoProducts,
  LinktoOrders,
  LinktoDashboard,
  value,
  onChange,
  onSubmit,
}) => {
  // TODO: Init
  const navigate = useNavigate();

  // TODO: Handle logout
  const handleLogout = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth/logout`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      localStorage.clear()
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
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
          <Link to={LinktoOrders}>Orders</Link>
          <Link to={LinktoDashboard}>Dashboard</Link>
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
          <span className={styles.chat}>
            <img src={chat} alt="chat" />
          </span>
          <span className={styles["btn-logout"]}>
            <p className={styles["btn-logout-init"]} onClick={handleLogout}>
              Logout
            </p>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
