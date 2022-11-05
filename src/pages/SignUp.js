import React from "react";

import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import styles from "../styles/SignUp.module.css";

import eat from "../assets/images/eat.png";

import mammiLogo from "../assets/images/mammi-logo.png";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import axios from "axios";

import CardMember from "../components/CardMember";

function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}api/v1/users`, {
        email: data.name,
        password: data.password,
        phone_number: data.phonenumber,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            <span className={styles.login}>
              <Link to={`/login`}>
                <button>Login</button>
              </Link>
            </span>
          </span>
          <span className={styles["sign-up"]}>
            <h3>Sign Up</h3>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="inputEmail">Email Address:</label>
              <input
                type="text"
                placeholder="Enter your Email Address"
                id="inputEmail"
                required="text"
                {...register("name")}
              />
              <label htmlFor="inputPassword">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="inputPassword"
                required="text"
                {...register("password")}
              />
              <label htmlFor="inputPhoneNumber">Phone Number:</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                id="inputPhoneNumber"
                required="text"
                {...register("phonenumber")}
              />
              <button className={styles["btn-sign-up"]}>Sign Up</button>
              <button className={styles["btn-google-sign-up"]}>
                Sign up with Google
              </button>
            </form>
          </span>
        </section>
      </main>
      <CardMember/>
      <Footer />
    </>
  );
}

export default SignUp;
