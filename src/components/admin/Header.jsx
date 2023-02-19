import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProfilesAction from "../../redux/actions/profile";
import { useDispatch } from "react-redux";
import authAction from "../../redux/actions/auth";

import LoaderBtn from "../LoaderBtn";
import styles from "../../styles/admin/Header.module.css";

import mammiLogo from "../../assets/images/mammi-logo.png";
import searchIcon from "../../assets/icons/search.svg";
import chat from "../../assets/icons/chat.svg";

const Header = ({ onChange }) => {
  const dispatch = useDispatch();
  const [loaderButton, setLoaderBtn] = useState(false);
  const [toggleSearch, setToggleSeacrh] = useState(true);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");

  // Handle logout
  const handleLogout = () => {
    dispatch(
      authAction.logoutThunk(
        accessToken,
        resCbPending,
        resCbFulfilled,
        resCbRejected,
        resCbFinally
      )
    );
  };

  const resCbPending = () => {
    setLoaderBtn(true);
  };

  const resCbFulfilled = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const resCbRejected = (error) => {
    console.log(error.message);
  };

  const resCbFinally = () => {
    setLoaderBtn(false);
  };

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
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  isActive ? styles["active-style-nav"] : undefined
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? styles["active-style-nav"] : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>
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
          <span className={styles.chat}>
            <img src={chat} alt="chat" />
          </span>
          {accessToken ? (
            <span className={styles["btn-logout"]}>
              <p className={styles["btn-logout-init"]} onClick={handleLogout}>
                {loaderButton ? (
                  <LoaderBtn loaderStyle={styles["loader-btn"]} />
                ) : (
                  "Logout"
                )}
              </p>
            </span>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
