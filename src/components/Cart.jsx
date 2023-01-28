import React from 'react'

import styles from "../styles/Cart.module.css"

export const CartSingleProduct = ({ orderSummaryOfCheckout, handleDeleteProduct }) => {
  return (
    <>
      <h3>Order Summary</h3>
      <ul className={styles["order-summary__products"]}>
        <li className={styles["order-summary__product"]}>
          <img
            src={orderSummaryOfCheckout?.image}
            alt={orderSummaryOfCheckout?.name}
          />
          <span className={styles["order-summary__product__entity"]}>
            <p className={styles["product__item"]}>
              {orderSummaryOfCheckout?.product_name}
            </p>
            <p className={styles["product__qty"]}>
              x{orderSummaryOfCheckout?.qty}
            </p>
            <p className={styles["product__size"]}>Reguler</p>
          </span>
          <span className={styles["order-summary__product__price"]}>
            <p className={styles["product__price"]}>
              IDR {orderSummaryOfCheckout?.price}
            </p>
          </span>
        </li>
      </ul>
      <span className={styles.total}>
        <span className={styles.subtotal}>
          <p>SUBTOTAL</p>
          <p>{orderSummaryOfCheckout?.subtotal}</p>
        </span>
        <span className={styles["tax-and-fee"]}>
          <p>TAX & FEE</p>
          <p>{orderSummaryOfCheckout?.tax}</p>
        </span>
        <span className={styles.shipping}>
          <p>SHIPPING</p>
          <p>
            IDR{" "}
            {orderSummaryOfCheckout?.shipping +
              orderSummaryOfCheckout?.charge_cost}
          </p>
        </span>
      </span>
      <span className={styles.totals}>
        <p>Total</p>
        <p>IDR.{orderSummaryOfCheckout?.total}</p>
      </span>
      <span className={styles["delete-btn-section"]}>
        <button className={styles["delete-btn"]} onClick={handleDeleteProduct}>
          Delete
        </button>
      </span>
    </>
  );
};

export const CartMultipleProduct = ({
  orderSummaryOfCheckout,
  handleDeleteProduct,
}) => {
  return (
    <>
      {/* <h3>Order Summary</h3>
      <ul className={styles["order-summary__products"]}>
        <li className={styles["order-summary__product"]}>
          <img
            src={orderSummaryOfCheckout?.image}
            alt={orderSummaryOfCheckout?.name}
          />
          <span className={styles["order-summary__product__entity"]}>
            <p className={styles["product__item"]}>
              {orderSummaryOfCheckout?.product_name}
            </p>
            <p className={styles["product__qty"]}>
              x{orderSummaryOfCheckout?.qty}
            </p>
            <p className={styles["product__size"]}>Reguler</p>
          </span>
          <span className={styles["order-summary__product__price"]}>
            <p className={styles["product__price"]}>
              IDR {orderSummaryOfCheckout?.price}
            </p>
          </span>
        </li>
      </ul>
      <span className={styles.total}>
        <span className={styles.subtotal}>
          <p>SUBTOTAL</p>
          <p>{orderSummaryOfCheckout?.subtotal}</p>
        </span>
        <span className={styles["tax-and-fee"]}>
          <p>TAX & FEE</p>
          <p>{orderSummaryOfCheckout?.tax}</p>
        </span>
        <span className={styles.shipping}>
          <p>SHIPPING</p>
          <p>
            IDR{" "}
            {orderSummaryOfCheckout?.shipping +
              orderSummaryOfCheckout?.charge_cost}
          </p>
        </span>
      </span>
      <span className={styles.totals}>
        <p>Total</p>
        <p>IDR.{orderSummaryOfCheckout?.total}</p>
      </span>
      <span className={styles["delete-btn-section"]}>
        <button className={styles["delete-btn"]} onClick={handleDeleteProduct}>
          Delete
        </button>
      </span> */}
    </>
  );
};