import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PrivateRoute from "../utils/PrivateRoute";
import TransactionsAction from "../redux/actions/transactions";
import { paginateProductOrder } from "../utils/api/transactions";

import styles from "../styles/History.module.css";

const History = () => {
  const dispatch = useDispatch();
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const accessToken = localStorage.getItem("access-token");
  // Private route
  PrivateRoute(!accessToken, -1);
  const getHistoryTransaction = useSelector(
    (state) => state.transactions?.getHistoryTransaction
  );
  console.log("History transaction: ", getHistoryTransaction);
  const [urlNext, setUrlNext] = useState();
  const [urlPrev, setUrlPrev] = useState();

  useEffect(() => {
    setUrlNext(getHistoryTransaction.next);
    setUrlPrev(getHistoryTransaction.previous);
  }, [getHistoryTransaction.next, getHistoryTransaction.previous]);

  console.log("Url next: ", urlNext);
  console.log("Url prev: ", urlPrev);

  // Get History Transaction
  const resFulfilled = (data) => {
    // console.log("Get History Transactions: ", data);
    setHistoryTransactions(data);
  };

  useEffect(() => {
    dispatch(
      TransactionsAction.getHistoryTransactionsThunk(
        accessToken,
        `page=${page}&limit=${limit}`,
        resFulfilled
      )
    );
  }, [dispatch, accessToken, limit, page]);

// Handle Pagination
  const handleNext = async () => {
    const response = await paginateProductOrder(urlNext, accessToken);
    // console.log(response);
    setHistoryTransactions(response.data.result.data);
    setUrlPrev(response.data.result.previous);
    setUrlNext(response.data.result.next);
  };

  const handlePrev = async () => {
    const response = await paginateProductOrder(urlPrev, accessToken);
    setHistoryTransactions(response.data.result.data);
    setUrlPrev(response.data.result.previous);
    setUrlNext(response.data.result.next);
  };

  return (
    <>
      <TitleBar title={`MAMMI | History`} />
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
        <section className={styles["pagination-history-cutomer"]}>
          <button
            className={
              styles[
                urlPrev === null ? "pagination-btn" : "pagination-btn-active"
              ]
            }
            onClick={handlePrev}
            disabled={urlPrev === null}
          >
            Previous
          </button>
          <button
            className={
              styles[
                urlNext === null ? "pagination-btn" : "pagination-btn-active"
              ]
            }
            onClick={handleNext}
            disabled={urlNext === null}
          >
            Next
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default History;
