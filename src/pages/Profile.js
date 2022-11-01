
import React from "react";

import { useNavigate } from 'react-router-dom';

import withNavigate from "../helpers/withNavigate";

import { useEffect } from 'react';

import Header from '../components/Header';

import Footer from '../components/Footer';

import styles from "../styles/Profile.module.css";

import bangPutra from "../assets/images/bang-putra.png";

import pen from "../assets/icons/pen.svg";


function Profile() {

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Header
          LinktoHome="/"
          LinktoProducts="/products"
          LinktoYourcart="/product-detail-customer"
          LinktoHistory="/history-customer"
          Avatar={bangPutra}
          LinktoProfile="/profile"
        />
        <main className={styles.main}>
          <h3 className={styles.title}>User Profile</h3>
          <section
            className={`d-flex flex-row gap-4 justify-content-center ${styles["identity-user"]}`}
          >
            <span className={styles.profile}>
              <img
                src={bangPutra}
                alt="Profile"
                className={styles["profile__image"]}
              />
              <span className={styles["btn-profile"]}>
                <img src={pen} alt="btn-profile" />
              </span>
              <p className={styles["display-name"]}>Bang Raput</p>
              <p className={styles.email}>raput@gmail.com</p>
              <p className={styles.status}>Has been ordered 15 products</p>
            </span>
            <span className={styles.contacts}>
              <span className={styles["header-contact"]}>
                <h3>Contacts</h3>
                <span className={styles["btn-contact"]}>
                  <img src={pen} alt="btn-contact" />
                </span>
              </span>
              <form className={styles.forms}>
                <span className={styles.email}>
                  <label for="emailAddress">Email address:</label>
                  <input type="text" id="emailAddress" />
                </span>
                <span className={styles["mobile-number"]}>
                  <label for="mobileNumber">Mobile number:</label>
                  <input type="text" id="mobileNumber" />
                </span>
                <span className={styles["delivery"]}>
                  <label for="deliveryAddress">Delivery address:</label>
                  <input type="text" id="deliveryAddress" />
                </span>
              </form>
            </span>
          </section>
          <section className={styles["identity-detail-user"]}>
            <section className={styles.details}>
              <span className={styles["header-detail"]}>
                <h3>Details</h3>
                <span className={styles["btn-detail"]}>
                  <img src={pen} alt="btn-detail" />
                </span>
              </span>
              <span className={styles["details__left-side"]}>
                <span className={styles["display-name"]}>
                  <label for="displayName">Display name:</label>
                  <input type="text" id="displayName" />
                </span>
                <span className={styles["first-name"]}>
                  <label for="firstName">First name:</label>
                  <input type="text" id="firstName" />
                </span>
                <span className={styles["last-name"]}>
                  <label for="lastName">Last name:</label>
                  <input type="text" id="lastName" />
                </span>
              </span>
              <span className={styles["details__right-side"]}>
                <span className={styles.date}>
                  <label for="birth">DD/MM/YY</label>
                  <input type="text" name="" id="birth" />
                </span>
                <span className={styles.gender}>
                  <span>
                    <input type="radio" id="male" />
                    <label for="male">Male</label>
                  </span>
                  <span>
                    <input type="radio" id="female" />
                    <label for="female">Female</label>
                  </span>
                </span>
              </span>
            </section>
            <section className={styles.buttons}>
              <p>Do you want to save the change?</p>
              <button className={styles["btn-save"]}>Save Change</button>
              <button className={styles["btn-cancel"]}>Cancel</button>
              <button className={styles["btn-edit"]}>Edit Password</button>
              <button  onClick={() => {
                localStorage.removeItem('token')
              }} className={styles["btn-log-out"]} >Log Out</button>
            </section>
          </section>
        </main>
        <Footer />
    </>
  )
}

export default withNavigate(Profile);