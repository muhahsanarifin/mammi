import React from "react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Header from "../components/Header";

import Footer from "../components/Footer";

import styles from "../styles/History.module.css";

const History = () => {
  const navigate = useNavigate();
  const [historyTransactions, setHistoryTransactions] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // TODO: Get History Transaction
  const getHistoryTransactions = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/transactions/history`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      setHistoryTransactions(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHistoryTransactions();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles["history-customer"]}>
          <h3 className={styles["history-customer__title"]}>
            Let's see what you have bought!
          </h3>
          <p className={styles["history-customer__description"]}>
            Long press to delete item
          </p>
        </section>
        <section className={styles["history-customer__products"]}>
          <ul className={styles["history-customer__product__items"]}>
            {historyTransactions.map((historyTransaction) => (
              <>
                <li className={styles["history-customer__product__item"]}>
                  <span className={styles["history-customer__product__detail"]}>
                    <span
                      className={
                        styles["history-customer__product__item__image"]
                      }
                    >
                      <img
                        src={historyTransaction.image}
                        alt={historyTransaction.product_name}
                      />
                    </span>
                    <span className={styles["product_item__description"]}>
                      <p className={styles["product_item__description__title"]}>
                        {historyTransaction.product_name}
                      </p>
                      <p className={styles["product_item__description__price"]}>
                        {historyTransaction.price}
                      </p>
                      <p
                        className={styles["product_item__description__status"]}
                      >
                        {historyTransaction.status}
                      </p>
                    </span>
                  </span>
                </li>
              </>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default History;
