import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

import styles from "../styles/SignUp.module.css"

import eat from "../assets/images/eat.png";

import coffeLogo from "../assets/images/coffee-logo.svg";

export class SignUp extends Component {
  render() {
    return (
      <>
        <main className={styles.main}>
          <aside className={`${styles["aside"]} ${styles["main__left-side"]}`}>
            <img src={eat} alt="Eat"/>
          </aside>
          <section className={styles["main__rigth-side"]}>
            <span className={styles.header}>
              <span className={styles.logo}>
                <span className={styles["logo__image"]}>
                  <img src={coffeLogo} alt="mammi-logo"/>
                </span>
                <span className={styles["logo__init"]}>
                  <p>MAMMI</p>
                </span>
              </span>
              <span className={styles.login}>
                <Link to={`/login`}>
                  <button>Login</button>
                </Link>
              </span>
            </span>
            <span className={styles["sign-up"]}>
              <h3>Sign Up</h3>
              <form className={styles.form}>
                <label for="inputEmail">Email Address:</label>
                <input type="text" placeholder="Enter your Email Address" id="inputEmail" required="text"/>
                <label for="inputPassword">Password:</label>
                <input type="text" placeholder="Enter your password" id="inputPassword" required="text"/>
                <label for="inputPhoneNumber">Phone Number:</label>
                <input type="text" placeholder="Enter your phone number" id="inputPhoneNumber" required="text"/>
                <button className={styles["btn-sign-up"]}>Sign Up</button>
                <button className={styles["btn-google-sign-up"]}>Sign up with Google</button>
              </form>
            </span>
          </section>
        </main>

        <section className={styles["member-cards"]}>
          <span>
            <h3>Get your member card now!</h3>
            <p>Lets join with our member and enjoy the deals</p>
          </span>
          <button className={styles["btn-create-member"]}>
            Create Now
          </button>
        </section>
        <Footer/>
      </>
    )
  }
}

export default SignUp;