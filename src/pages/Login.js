import React from "react";

import axios from "axios";

import { useState } from "react"

import { useNavigate } from "react-router-dom";

import withNavigate from "../helpers/withNavigate";

import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import styles from "../styles/Login.module.css"

import eat from "../assets/images/eat.png";

import coffeLogo from "../assets/images/coffee-logo.svg";

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/v1/auth', {
      email,
      password
    }).then((response) => {
      alert('Login Success');
      //console.log(response.data.result.result.token);
      localStorage.setItem('token', response.data.result.result.token);

      navigate('/');

    }).catch((err) => alert ("Password or Email is wrong"));
  }

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
                <img src={coffeLogo} alt="mammi-logo" />
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
                type="text"
                placeholder="Enter your password"
                // id="inputPassword"
                required="password"
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
              <button className={styles["btn-google-login"]}>
                Login with Google
              </button>
            </form>
          </span>
        </section>
      </main>
      <section className={styles["member-cards"]}>
        <span>
          <h3>Get your member card now!</h3>
          <p>Lets join with our member and enjoy the deals</p>
        </span>
        <button className={styles["btn-create-member"]}>Create Now</button>
      </section>
      <Footer />
    </>
  );
}

export default withNavigate(Login);