import React, { Component } from "react";

import Footer from "../components/Footer";

import styles from "../styles/ForgotPassword.module.css";

export class ForgotPasword extends Component {
  render() {
    return (
      <>
        <main className={styles.main}>
          <section className={styles.title}>
            <h3>Forgot Your password ?</h3>
            <p>Don't worry, we got your back!</p>
          </section>
          <section className={styles["send-component"]}>
            <input
              type="text"
              placeholder="Enter your email address to get link"
            />
            <button className={styles["send-btn"]}>Send</button>
          </section>
          <section className={styles["resend-component"]}>
            <p className={styles["resend-component__title"]}>
              Click here if you didn't receive any link in 2 minutes
            </p>
            <button className={styles["resend-btn"]}>Resend Link</button>
            <p className={styles["resend-component__count-down"]}>01:54</p>
          </section>
        </main>
        <Footer/>
      </>
    );
  }
}

export default ForgotPasword