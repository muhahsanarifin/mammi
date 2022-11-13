import React from "react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import styles from "../styles/Checkout.module.css";

import Header from "../components/Header";

import Footer from "../components/Footer";

import creditCard from "../assets/icons/credit-card.svg";

import bankAccount from "../assets/icons/bank.svg";

import delivery from "../assets/icons/fast-delivery.svg";

import huzelnutLatte from "../assets/images/products/hazelnut-latte-82-90.svg";

import chikenFireWings from "../assets/images/products/chicken-fire-wings-82-90.svg";

const Checkout = () => {
  // « Init »
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("data-user")) {
      navigate("/login");
    }
  }, []);

  // « Get Token User »
  const getTokenUser = (token) => {
    const getTokenUser = localStorage.getItem("data-user");
    const dataUser = JSON.parse(getTokenUser);
    return (token = dataUser.token);
  };
  const tokenUser = getTokenUser();

  // « Get useID User »
  const userID = (userId) => {
    const getTokenUser = localStorage.getItem("data-user");
    const dataUser = JSON.parse(getTokenUser);
    return (userId = dataUser.id);
  };
  const userId = userID();

  // « Get Profiles »
  const getProfiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/profile/id`,
        {
          headers: {
            "x-access-token": tokenUser,
          },
        }
      );
      console.log(response);
      setProfiles(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      {profiles.map((profile) => (
        <Header
          LinktoHome="/"
          LinktoProducts="/products"
          LinktoYourcart="/checkout"
          LinktoHistory="/history"
          imgsrc={`${process.env.REACT_APP_BACKEND_HOST}${profile.picture}`}
          alt={`${profile.display_name}`}
          LinktoProfile={`${userId}`}
        />
      ))}
      <main className={styles.main}>
        <section className={styles.title}>
          <h3>Checkout your item now!</h3>
        </section>
        <section className={styles.sides}>
          <span className={styles["left-side"]}>
            <span className={styles["order-summary"]}>
              <h3>Order Summary</h3>
              <ul className={styles["order-summary__products"]}>
                <li className={styles["order-summary__product"]}>
                  <img src={huzelnutLatte} alt="Hazelnut Latte" />
                  <span className={styles["order-summary__product__entity"]}>
                    <p className={styles["product__item"]}>Hazelnut Latte</p>
                    <p className={styles["product__qty"]}>x1</p>
                    <p className={styles["product__size"]}>Reguler</p>
                  </span>
                  <span className={styles["order-summary__product__price"]}>
                    <p className={styles["product__price"]}>IDR 24000</p>
                  </span>
                </li>
                <li className={styles["order-summary__product"]}>
                  <img src={chikenFireWings} alt="Chicken Wings" />
                  <span className={styles["order-summary__product__entity"]}>
                    <p className={styles["product__item"]}>Hazelnut Latte</p>
                    <p className={styles["product__qty"]}>x1</p>
                    <p className={styles["product__size"]}>Reguler</p>
                  </span>
                  <span className={styles["order-summary__product__price"]}>
                    <p className={styles["product__price"]}>IDR 24000</p>
                  </span>
                </li>
              </ul>
              <span className={styles.total}>
                <span className={styles.subtotal}>
                  <p>SUBTOTAL</p>
                  <p>IDR 124000</p>
                </span>
                <span className={styles["tax-and-fee"]}>
                  <p>TAX & FEE</p>
                  <p>IDR 20000</p>
                </span>
                <span className={styles.shipping}>
                  <p>SHIPPING</p>
                  <p>IDR 20000</p>
                </span>
              </span>
              <span className={styles.totals}>
                <p>Total</p>
                <p>IDR 150.000</p>
              </span>
            </span>
          </span>
          <span className={styles["right-side"]}>
            <span className={styles["right-side__address-details"]}>
              <span className={styles["address-detail-top"]}>
                <p>Address details</p>
                <p className={styles["address-btn-edit"]}>Edit</p>
              </span>
              <span className={styles["address-detail-bottom"]}>
                <p>Delivery to Iskandar Street</p>
                <p>
                  Km 5 refinery road oppsite re public road, effurun, Jakarta
                </p>
                <p>+62 81348287878</p>
              </span>
            </span>
            <span className={styles["right-side__payment-method"]}>
              <span className={styles["right-side__payment-method__title"]}>
                <p>Payment Method</p>
              </span>
              <span className={styles["right-side__payment-method__types"]}>
                <span className={styles["payment-method__card"]}>
                  <input type="radio" />
                  <label>
                    <img src={creditCard} alt="Card" />
                    Card
                  </label>
                </span>
                <span className={styles["bank-account"]}>
                  <input type="radio" />
                  <label>
                    <img src={bankAccount} alt="Bank Account" />
                    Bank Account
                  </label>
                </span>
                <span className={styles["cash-on-delivery"]}>
                  <input type="radio" />
                  <label>
                    <img src={delivery} alt="Cash on Delivery" />
                    Cash on Delivery
                  </label>
                </span>
              </span>
            </span>
            <button className={styles["confirm-and-pay"]}>
              Confirm and Pay
            </button>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
