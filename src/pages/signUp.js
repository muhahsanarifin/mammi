import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import usersAction from "../redux/actions/users";
import authAction from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import PasswordToggle from "../components/PasswordToggle";
import Footer from "../components/Footer";
import CardMember from "../components/MemberCard";
import TitleBar from "../components/TitleBar";

import styles from "../styles/SignUp.module.css";
import mammiLogo from "../assets/images/mammi-logo.png";
import eat from "../assets/images/eat.png";
import LoaderBtn from "../components/LoaderBtn";

const SignUp = () => {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [loaderButton, setLoaderBtn] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setEmail(data.name);
    setPassword(data.password);
    reset();

    dispatch(
      usersAction.registerUserThunk(
        {
          email: email,
          password: password,
          phone_number: data.phonenumber,
        },
        resPendingRegister,
        resFulfilledRegister,
        resErrorRegister,
        resFinallyRegister
      )
    );
  };

  const resPendingRegister = () => {
    setLoaderBtn(true);
  };

  const resFulfilledRegister = (response) => {
    dispatch(
      authAction.loginThunk(
        { email: email, password: password },
        resPendingLogin,
        resFulfilledLogin,
        resErrorLogin,
        resFinallyLogin
      )
    );
  };

  const resErrorRegister = (error) => { // Developer does not use it temporarily
    // console.log(error.response?.data.msg);
  };

  const resFinallyRegister = () => {
    setLoaderBtn(false);
  };

  const resPendingLogin = () => {}; // Developer does not use it temporarily

  const resFulfilledLogin = (response) => {
    localStorage.setItem("access-role", response.data.result.data.role);
    localStorage.setItem("access-token", response.data.result.data.token);
    localStorage.setItem("access-picture", response.data.result.data.picture);
    navigation("/products");
  };

  const resErrorLogin = (error) => { // Developer does not use it temporarily
    // console.log(error.response?.data.resul.msg);
  };

  const resFinallyLogin = () => {
    setLoaderBtn(false);
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <>
      <TitleBar title={`MAMMI | Sign Up`} />
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
                {loaderButton ? <LoaderBtn /> : <span>Sign Up</span>}
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
