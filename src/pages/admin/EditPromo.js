import React from "react";
import { Link } from "react-router-dom";

import HeaderAdmin from "../../components/Header";

import styles from "../../styles/admin/EditPromo.module.css";

const EditPromo = () => {
  return (
    <>
      <HeaderAdmin />
      <main className={styles.main}>
        <section className={styles.breadcrumb}>
          <nav className={styles["breadcrumb-nav"]}>
            <ul className={styles["breadcrumb-list"]}>
              <li className={styles["breadcrumb-item"]}>
                <Link to={`/products`}>Favorite & Promo</Link>
              </li>
              <li
                className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-divider"]}`}
              >
                Edit promo
              </li>
              <li
                className={`${styles["breadcrumb-item"]} ${styles["cancel-btn"]}`}
              >
                Cancel
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles["main__contents"]}>
          <span className={styles["identity-product"]}>
            <span
              className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
            >
              <span className={styles["promo__card"]}>
                <img src={""} alt="Product Promo" />
                <p>Cold Brew</p>
                <span className={styles["btn-profile"]}>
                  <input type="file" />
                </span>
                <span className={styles["promo__card__decs"]}>
                  Buy 1 Choco Oreo and get 20% off for Beff Spaghetti
                </span>
                <span className={styles.coupon}>
                  <p className={styles["coupon__title"]}>COUPON CODE</p>
                  <h3>M4N1$</h3>
                  <p className={styles.description}>
                    Valid until October 10th 2020
                  </p>
                </span>
              </span>
            </span>
            <span className={styles["description-products"]}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Type product name min. 50 characters"
                />
              </label>
              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Type the price"
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe your product min. 150 characters"
                />
              </label>
            </span>
          </span>
          <span className={styles["delivery-size-btn-section"]}>
            <span className={styles["main-delivery"]}>
              <span className={styles.delivery}>
                <label htmlFor="">Expire date:</label>
                <span className={styles["delivery__components"]}>
                  <select disabled>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                  <select disabled>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Input promo code:</label>
                <input type="text" />
              </span>
            </span>
            <span className={styles["compact-component"]}>
              <span className={styles.size}>
                <label htmlFor="#">Input product size:</label>
                <p>click methods you want to use for this product</p>
                <span className={styles["size_type"]}>
                  <ul>
                    <li>R</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>250 gr</li>
                    <li>300 gr</li>
                    <li>500 gr</li>
                  </ul>
                </span>
              </span>
              <span className={styles["delivery-entity"]}>
                <label htmlFor="#">Input delivery methods:</label>
                <p>Click methods you want to use for this product</p>
                <ul className={styles["delivery-methods"]}>
                  <li>Home Delivery</li>
                  <li>Dine in</li>
                  <li>Take away</li>
                </ul>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Enter the discount:</label>
                <span className={styles["stock-component"]}>
                  <select disabled>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </span>
              </span>
              <span className={styles["btn-product"]}>
                <button className={styles["btn-product__save"]}>
                  Save Change
                </button>
                {/* <button className={styles["btn-products__cancel"]}>
                  Cancel
                </button> */}
              </span>
            </span>
          </span>
        </section>
      </main>
    </>
  );
}

export default EditPromo;
