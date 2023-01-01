import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AlertProfile from "../components/Alert";
import mammiLogo from "../assets/images/mammi-logo.png";
import searchIcon from "../assets/icons/search.svg";
import chat from "../assets/icons/chat.svg";
import styles from "../styles/Header.module.css";

const Header = ({ onChange }) => {
  const [alert, setAlert] = useState(false);
  const navigation = useNavigate();

  const accessToken = localStorage.getItem("access-token");
  const accessPicture = localStorage.getItem("access-picture");

  useEffect(() => {
    if (accessPicture) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [accessPicture]);

  const onDismiss = () => setAlert(false);

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
              {" "}
              <Link to={`/products`}>Product</Link>
            </li>
            <li>
              {" "}
              <Link to={`/order`}>Orders</Link>
            </li>
            <li>
              <Link to={`/history`}>History</Link>
            </li>
          </ul>
        </nav>
        <div className="d-flex flex-row gap-4  align-items-center">
          <span className={styles.search}>
            <img src={searchIcon} alt="search" />
            <input type="text" placeholder="Search" onChange={onChange} />
          </span>
          {accessToken ? (
            <>
              <span className={styles.chat}>
                <img src={chat} alt="chat" />
              </span>
              <span className={styles.avatar}>
                <Link to={`/profile`}>
                  <img src={accessPicture} alt={accessPicture} />
                </Link>
              </span>
            </>
          ) : null}
        </div>
      </header>
      {accessToken && (
        <>
          {alert && (
            <AlertProfile
              toggle={onDismiss}
              onClick={() => navigation("/profile")}
              decs={`Hi, update your profile`}
            />
          )}
        </>
      )}
    </>
  );
};

export default Header;
