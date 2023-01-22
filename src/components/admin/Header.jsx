import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import styles from "../../styles/admin/Header.module.css";

import mammiLogo from "../../assets/images/mammi-logo.png";
import searchIcon from "../../assets/icons/search.svg";
import chat from "../../assets/icons/chat.svg";

const Header = ({ onChange }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");

  // TODO: Handle logout
  const handleLogout = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth/logout`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      localStorage.clear();
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
          <ul className={styles["content-navbar"]}>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/products`}>Product</Link>
            </li>
            <li>
              <Link to={`/order`}>Orders</Link>
            </li>
            <li>
              <Link to={`/dashboard`}>Dashboard</Link>
            </li>
          </ul>
        </nav>
        <div className="d-flex flex-row gap-4  align-items-center">
          <span className={styles.search}>
            <img src={searchIcon} alt="search" />
            <input type="text" placeholder="Search" onChange={onChange} />
          </span>
          <span className={styles.chat}>
            <img src={chat} alt="chat" />
          </span>
          {accessToken ? (
            <span className={styles["btn-logout"]}>
              <p className={styles["btn-logout-init"]} onClick={handleLogout}>
                Logout
              </p>
            </span>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
