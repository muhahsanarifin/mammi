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
  // const [PasswordInputType, ToggleIcon] = PasswordToggle();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/api/v1/auth`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.result.result.token);
        localStorage.setItem("token", response.data.result.result.token);
        navigate("/products");
      })
      .catch((err) => console.log("Password or Email is wrong"));
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
              <label for="inputEmail">Email Address:</label>
              <input
                type="text"
                placeholder="Enter your Email Address"
                // id="inputEmail"
                required="password"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="inputPassword">Password:</label>
              <input
                type="password"
                // type={PasswordInputType}
                placeholder="Enter your password"
                required="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <span className="password-toogle-icon">{ToggleIcon}</span> */}
              <span className={styles["forgot-password"]}>
                <Link
                  to={`/forgot-password`}
                  style={{ textDecoration: "none" }}
                >
                  <p>Forgot password?</p>
                </Link>
              </span>
              <button className={styles["btn-login"]}>Login</button>
              <button className={styles["btn-google-login"]}>
                Login with Google
              </button>
            </form>
          </span>
        </section>
      </main>
      <CardMember/>
      <Footer />
    </>
  );
};

export default Login;
