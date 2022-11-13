import React from "react";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Header from "../components/Header";

import Footer from "../components/Footer";

import styles from "../styles/ProductDetail.module.css";

import coldBrew from "../assets/images/products/cold-brew.svg";

import arrowBrown from "../assets/icons/arrow-brown.svg";

import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  // « Init »
  const [products, setProductDetail] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const { id } = useParams();

  // « Get Token User »
  const getTokenUser = (token) => {
    const getTokenUser = localStorage.getItem("data-user");
    const dataUser = JSON.parse(getTokenUser);
    return (token = dataUser.token);
  };
  const tokenUser = getTokenUser();

  // « Get ID User »
  const userID = (userId) => {
    const getTokenUser = localStorage.getItem("data-user");
    const dataUser = JSON.parse(getTokenUser);
    return (userId = dataUser.id);
  };
  const userId = userID();

  // « Get Product Detail »
  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/${id}`
      );

      setProductDetail(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

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
        {products.map((product) => (
          <>
            <section className={styles.breadcrumb}>
              <nav className={styles["breadcrumb-nav"]}>
                <ul className={styles["breadcrumb-list"]}>
                  <li className={styles["breadcrumb-item"]}>
                    <Link to={`/products`}>Favorite & Promo</Link>
                  </li>
                  <li
                    className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-divider"]}`}
                  >
                    <a href="#">{product.product_name}</a>
                  </li>
                </ul>
              </nav>
            </section>
            <section
              className={`${styles["first-main"]} ${styles["identity-product"]}`}
            >
              <span className={styles["identity-product_image"]}>
                <img
                  src={`${process.env.REACT_APP_BACKEND_HOST}${product.image}`}
                  alt="Cold Brew"
                />
              </span>

              <span className={styles["identity-product__description"]}>
                <h3 className={styles["identity-product__description__title"]}>
                  {product.product_name}
                </h3>
                <article
                  className={styles["identity-product__description__article"]}
                >
                  {/* Cold brewing is a method of brewing that combines ground
                  coffee and cool water and uses time instead of heat to extract
                  theflavor. It is brewed in small batches and steeped for as
                  long as 48 hours. */}
                  {product.description}
                </article>
                <p
                  className={styles["identity-product__description__delivery"]}
                >
                  Delivery only on Monday to Friday at 1-7pm
                </p>
              </span>
            </section>
          </>
        ))}
        <section className={styles["second-main"]}>
          <span className={styles["delivery-and-time"]}>
            <p className={styles["delivery-and-time__title"]}>
              Delivery and Time
            </p>
            <span className={styles["delivery-types"]}>
              <ul>
                <li>Dine in</li>
                <li>Door Delivery</li>
                <li>Pick Up</li>
              </ul>
            </span>
            <span className={styles["delivery-time"]}>
              <p>Now</p>
              <ul>
                <li>Yes</li>
                <li>No</li>
              </ul>
            </span>
            <span className={styles["delivery-set-time"]}>
              <label>Set time</label>
              <input type="text" placeholder="Enter time for reservation" />
            </span>
          </span>
          <span className={styles["confirm-product"]}>
            <span className={styles["confirm-product__qty"]}>
              <span className={styles["confirm-product__qty__count"]}>
                <span className={styles["confirm-product__qty__count__minus"]}>
                  -
                </span>
                <span
                  className={styles["confirm-product__qty__count__numeric"]}
                >
                  1
                </span>
                <span className={styles["confirm-product__qty__count__plus"]}>
                  +
                </span>
              </span>
              <span className={styles["confirm-product__price"]}>
                <p>IDR.30000</p>
              </span>
            </span>
            <span className={styles["confirm-product-btn"]}>
              <button className={styles["confirm-product-btn__add"]}>
                Add to Cart
              </button>
              <button className={styles["confirm-product-btn__ask"]}>
                Ask a staff
              </button>
            </span>
          </span>
        </section>
      </main>
      <section className={styles["size-and-checkout"]}>
        <span className={styles["size_type"]}>
          <p>Choose a size</p>
          <ul>
            <li>R</li>
            <li>L</li>
            <li>XL</li>
          </ul>
        </span>
        <span className={styles["checkout"]}>
          <span className={styles["checkout__image"]}>
            <img src={coldBrew} alt="Cold Brew" />
          </span>
          <span className={styles["checkout__identify"]}>
            <p className={styles["checkout__identify__title"]}> COLD BREW</p>
            <ul className={styles["checkout__identify__size"]}>
              <li>
                <p>x1</p>(Large)
              </li>
              <li>
                <p>x2</p>(Reguler)
              </li>
            </ul>
          </span>
          <span className={styles["checkout-btn"]}>
            <p>Checkout</p>
            <span className={styles["checkout-btn-icon"]}>
              <img src={arrowBrown} alt="Checkout Button" />
            </span>
          </span>
        </span>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;