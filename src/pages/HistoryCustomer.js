import React, { Component } from 'react';

import axios from "axios";

import Header from '../components/Header';

import Footer from '../components/Footer';

import styles from "../styles/HistoryCustomer.module.css";

import bangPutra from "../assets/images/bang-putra.png";

export class HistoryCustomer extends Component {
  state  = {
    histories: []
    }
    
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/v1/transactions/history`).then(response => {
      // console.log(response.data.result)
      this.setState({
        histories: response.data.result
      })
    })
  }

  render() {
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
              {/* <li className={styles["history-customer__product__item"]}>
                <span className={styles["history-customer__product__detail"]}>
                  <span
                    className={styles["history-customer__product__item__image"]}
                  >
                    <img src={veggieTomatoMix} alt="Veggie Tomato mix" />
                  </span>
                  <span className={styles["product_item__description"]}>
                    <p className={styles["product_item__description__title"]}>
                      Veggie Tomato mix
                    </p>
                    <p className={styles["product_item__description__price"]}>
                      IDR 34.000
                    </p>
                    <p className={styles["product_item__description__status"]}>
                      Delivered
                    </p>
                  </span>
                </span>
              </li> */}
              {this.state.histories.map((history) => (
                <li className={styles["history-customer__product__item"]}>
                  <span className={styles["history-customer__product__detail"]}>
                    <span
                      className={
                        styles["history-customer__product__item__image"]
                      }
                    >
                      <img
                        src={`${process.env.REACT_APP_BACKEND_HOST}${history.image}`}
                        alt={history.product_name}
                      />
                    </span>
                    <span className={styles["product_item__description"]}>
                      <p className={styles["product_item__description__title"]}>
                        {history.product_name}
                      </p>
                      <p className={styles["product_item__description__price"]}>
                        {`IDR ${history.price}`}
                      </p>
                      <p
                        className={styles["product_item__description__status"]}
                      >
                        {history.status}
                      </p>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default HistoryCustomer