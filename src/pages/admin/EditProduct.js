import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import HeaderAdmin from "../../components/admin/Header";
import { CameraOutlined } from "@ant-design/icons";
import styles from "../../styles/admin/EditProduct.module.css";

const EditProduct = () => {
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
                Edit product
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles["main__contents"]}>
          <span className={styles["identity-product"]}>
            <span className={styles["identity-product-picture"]}>
              <span className={styles["product-image"]}>
                {/* <img src="" alt="products" className={styles["product-image"]}/> */}
                <CameraOutlined
                  style={{
                    fontSize: "32px",
                    color: "#9f9f9f",
                    position: "absolute",
                    top: "2.1rem",
                    left: "2.1rem",
                  }}
                />
              </span>
              <span className={styles["product-input"]}>
                <input
                  type="file"
                  name="galery"
                  accept="image/*"
                  capture="camera"
                  className={styles.picture}
                />
                <input type="file" name="picture" className={styles.galery} />
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
                <label htmlFor="">Delivery Hour:</label>
                <span className={styles["delivery__components"]}>
                  <select name="" id="" disabled>
                    <option value="">Select start hour</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                  <select name="" id="" disabled>
                    <option value="">Select end hour</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Input stock:</label>
                <span className={styles["stock-component"]}>
                  <select name="" id="" disabled>
                    <option value="">Input stock</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </span>
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
                    <li>250 gram</li>
                    <li>300 gram</li>
                    <li>500 gram</li>
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
              <span className={styles["btn-product"]}>
                <button className={styles["btn-product__save"]}>
                  Save Product
                </button>
                <button className={styles["btn-products__cancel"]}>
                  Cancel
                </button>
              </span>
            </span>
          </span>
        </section>
        <section></section>
      </main>
    </>
  );
};

export default EditProduct;
