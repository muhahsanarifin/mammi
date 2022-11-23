import React from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

// import Validation from "../components/ValidationRegister";

import axios from "axios";

import styles from "../styles/SignUp.module.css";

import mammiLogo from "../assets/images/mammi-logo.png";

import eat from "../assets/images/eat.png";

import Footer from "../components/Footer";

import CardMember from "../components/CardMember";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();

    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}api/v1/users`, {
        email: data.name,
        password: data.password,
        phone_number: data.phonenumber,
      })
      .then((res) => {
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
              <label>Email Address:</label>
              <input
                type="text"
                placeholder="Enter your Email Address"
                {...register("name", {
                  required: "Email is required",
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
                className={`${errors.name && "invalid"}`}
              />
              {errors.name && (
                <span className={styles["info-validation"]}>
                  {errors.name.message}
                </span>
              )}

              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min password is six chracters",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <span className={styles["info-validation"]}>
                  {errors.password.message}
                </span>
              )}

              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                {...register("phonenumber", {
                  required: "Phone number is required",
                  pattern: {
                    value:
                      /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm,
                    message: "Input valid phone number",
                  },
                })}
                onKeyUp={() => {
                  trigger("phonenumber");
                }}
              />
              {errors.phonenumber && (
                <span className={styles["info-validation"]}>
                  {errors.phonenumber.message}
                </span>
              )}

              <button className={styles["btn-sign-up"]}>Sign Up</button>
            </form>
            <span className={styles["btn-google"]}>
              <button className={styles["btn-google-sign-up"]}>
                Sign up with Google
              </button>
            </span>
          </span>
        </section>
      </main>
      <CardMember />
      <Footer />
    </>
  );
}

export default SignUp;
