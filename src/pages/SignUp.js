import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import PasswordToggle from "../components/PasswordToggle";
import Footer from "../components/Footer";
import CardMember from "../components/CardMember";

import styles from "../styles/SignUp.module.css";
import mammiLogo from "../assets/images/mammi-logo.png";
import eat from "../assets/images/eat.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    reset();
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/register`,
        {
          email: data.name,
          password: data.password,
          phone_number: data.phonenumber,
        }
      );
      // console.log(response.data.result.data);
      if (response.status === 200) {
        navigate("/Login");
      }
    } catch (err) {
      console.log(err.response.data.result.msg);
    }
  };

  const handleShowPassword = () => {
    setShow(!show);
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
              <span className={styles.sectionEmail}>
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
              </span>
              <span className={styles["section__info-validation"]}>
                {errors.name && (
                  <span className={styles["info-validation"]}>
                    {errors.name.message}
                  </span>
                )}
              </span>

              <label>Password:</label>
              <span className={styles.sectionPassword}>
                <input
                  type={!show ? "password" : "text"}
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
                <PasswordToggle
                  onClickParams={handleShowPassword}
                  stateParams={!show}
                />
              </span>
              <span className={styles["section__info-validation"]}>
                {errors.password && (
                  <span className={styles["info-validation"]}>
                    {errors.password.message}
                  </span>
                )}
              </span>

              <label>Phone Number:</label>
              <span className={styles.sectionPhoneNumber}>
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
              </span>
              <span className={styles["section__info-validation"]}>
                {errors.phonenumber && (
                  <span className={styles["info-validation"]}>
                    {errors.phonenumber.message}
                  </span>
                )}
              </span>

              <button className={styles["btn-sign-up"]} disabled={!isValid}>
                Sign Up
              </button>
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
};

export default SignUp;
