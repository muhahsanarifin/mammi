import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import CardMember from "../components/MemberCard";
import PasswordToggle from "../components/PasswordToggle";
import LoaderBtn from "../components/LoaderBtn";
import TitleBar from "../components/TitleBar";
import PrivateRoute from "../utils/PrivateRoute";

import eat from "../assets/images/eat.png";
import mammiLogo from "../assets/images/mammi-logo.png";
import styles from "../styles/Login.module.css";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [feedEmail, setFeedEmail] = useState("");
  const [feedPassword, setFeedPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loaderButton, setLoaderBtn] = useState(false);
  const accessToken = localStorage.getItem("access-token");
  PrivateRoute(accessToken, +1);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoaderBtn(true);
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        // const user = response.data.result.data;
        // localStorage.setItem("user-data", JSON.stringify(user));
        localStorage.setItem("access-role", response.data.result.data.role);
        localStorage.setItem("access-token", response.data.result.data.token);
        localStorage.setItem(
          "access-picture",
          response.data.result.data.picture
        );
        navigation("/products");
      }
    } catch (err) {
      if (err.response.data.result.msg === "Email is incorrect") {
        setTimeout(() => {
          setFeedEmail(err.response.data.result.msg);
          setErrorEmail(true);
        }, 500);
      } else if (err.response.data.result.msg === "Password is incorrect") {
        setTimeout(() => {
          setFeedPassword(err.response.data.result.msg);
          setErrorPassword(true);
        }, 500);
      }
    } finally {
      setLoaderBtn(false);
      setErrorEmail(false);
      setErrorPassword(false);
    }
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <>
      <TitleBar title={`MAMMI | Login`} />
      <main className={styles.main}>
        <aside className={`${styles["aside"]} ${styles["main__left-side"]}`}>
          <img src={eat} alt="Eat" />
        </aside>
        <section className={styles["main__rigth-side"]}>
          <span className={styles.header}>
            <span className={styles.logo}>
              <span className={styles["logo__image"]}>
                <img src={mammiLogo} alt="mammi-logo" />
              </span>
              <span className={styles["logo__init"]}>
                <p>MAMMI</p>
              </span>
            </span>
            <span className={styles["sign-up"]}>
              <Link to={`/sign-up`}>
                <button>Sign Up</button>
              </Link>
            </span>
          </span>
          <span className={styles.login}>
            <h3>Login</h3>
            <form className={styles.form} onSubmit={submitHandler}>
              <label htmlFor="inputEmail">Email Address:</label>
              <span className={styles.sectionEmail}>
                <input
                  type="text"
                  placeholder="Enter your Email Address"
                  id="inputEmail"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              {errorEmail && (
                <span
                  style={{ fontSize: "12px", fontWeight: "800", color: "red" }}
                >
                  {feedEmail}
                </span>
              )}
              <label htmlFor="inputPassword">Password:</label>
              <span className={styles.sectionPassword}>
                <input
                  type={!show ? "password" : "text"}
                  id="inputPassword"
                  placeholder="Enter your password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordToggle
                  onClickParams={handleShowPassword}
                  stateParams={!show}
                />
              </span>
              {errorPassword && (
                <span
                  style={{ fontSize: "12px", fontWeight: "800", color: "red" }}
                >
                  {feedPassword}
                </span>
              )}
              <span className={styles["forgot-password"]}>
                <Link
                  to={`/password/forgot`}
                  style={{ textDecoration: "none" }}
                >
                  <p>Forgot password?</p>
                </Link>
              </span>
              <button
                className={styles["btn-login"]}
                disabled={!email || !password}
              >
                {loaderButton ? <LoaderBtn /> : <span>Login</span>}
              </button>
            </form>
            <span className={styles["btn-google"]}>
              <button className={styles["btn-google-login"]}>
                Login with Google
              </button>
            </span>
          </span>
        </section>
      </main>
      <CardMember />
      <Footer />
    </>
  );
};

export default Login;
