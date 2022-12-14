import React from "react";

import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import styles from "../styles/Login.module.css";

import eat from "../assets/images/eat.png";

import mammiLogo from "../assets/images/mammi-logo.png";

import CardMember from "../components/CardMember";

// import PasswordToggle from "../components/PasswordToggle";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}api/v1/auth`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.result.data);
        localStorage.setItem("id", response.data.result.data.id); // ← Set id to LocalStorage
        localStorage.setItem("token", response.data.result.data.token); // ← Set token to LocalStorage
        localStorage.setItem("role", response.data.result.data.role); // ← Set role to lodalStorage
        localStorage.setItem("picture", response.data.result.data.picture); // ← Set picture to lodalStorage
        navigate("/products");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
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
              <input
                type="text"
                placeholder="Enter your Email Address"
                id="inputEmail"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="inputPassword">Password:</label>
              <input
                type="password"
                id="inputPassword"
                placeholder="Enter your password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles["forgot-password"]}>
                <Link
                  to={`/forgot-password`}
                  style={{ textDecoration: "none" }}
                >
                  <p>Forgot password?</p>
                </Link>
              </span>
              <button className={styles["btn-login"]}>Login</button>
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
