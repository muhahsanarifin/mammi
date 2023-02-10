import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfilesAction from "../redux/actions/profile";

import AlertProfile from "../components/Alert";
import mammiLogo from "../assets/images/mammi-logo.png";
import searchIcon from "../assets/icons/search.svg";
import chat from "../assets/icons/chat.svg";
import styles from "../styles/Header.module.css";

const Header = ({ onChange }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access-token");
  const accessPicture = localStorage.getItem("access-picture");
  const [alert, setAlert] = useState(false);
  const [toggleSearch, setToggleSeacrh] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    if (accessPicture === "null") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [accessPicture]);

  const onDismiss = () => setAlert(false);

  const handleToggleSearch = () => {
    setToggleSeacrh(!toggleSearch);
  };

  useEffect(() => {
    dispatch(ProfilesAction.getProfileDetailThunk(accessToken));
  }, [accessToken, dispatch]);

  useEffect(() => {
    dispatch(ProfilesAction.getProfileContactThunk(accessToken));
  }, [accessToken, dispatch]);

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
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? styles["active-style-nav"] : undefined
                }
              >
                Products
              </NavLink>
            </li>
            {accessToken ? (
              <li>
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    isActive ? styles["active-style-nav"] : undefined
                  }
                >
                  Your Cart
                </NavLink>
              </li>
            ) : (
              <li style={{ cursor: "no-drop" }}>Your Cart</li>
            )}

            {accessToken ? (
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? styles["active-style-nav"] : undefined
                  }
                >
                  History
                </NavLink>
              </li>
            ) : (
              <li style={{ cursor: "no-drop" }}>History</li>
            )}
          </ul>
        </nav>
        <div className="d-flex flex-row gap-3  align-items-center">
          <span className={styles["search-section"]}>
            <span className={styles.search}>
              <input
                type="text"
                placeholder="Search"
                onChange={onChange}
                className={
                  toggleSearch
                    ? styles["search-input"]
                    : styles["search-input-active"]
                }
              />
              <img src={searchIcon} alt="search" onClick={handleToggleSearch} />
            </span>
          </span>
          {accessToken ? (
            <>
              <span className={styles.chat}>
                <img src={chat} alt="chat" />
              </span>
              <span
                className={styles.avatar}
                onClick={() => navigation("/profile")}
              >
                <img src={accessPicture} alt="profile" />
              </span>
            </>
          ) : null}
        </div>
      </header>
      {/* {updatedPicture && (
        <>
          {alert && (
            <AlertProfile
              toggle={onDismiss}
              onClick={() => navigation("/profile")}
              decs={`Hi, update your profile`}
            />
          )}
        </>
      )} */}
      {alert && (
        <AlertProfile
          toggle={onDismiss}
          onClick={() => navigation("/profile")}
          decs={`Hi, update your profile`}
        />
      )}
    </>
  );
};

export default Header;
