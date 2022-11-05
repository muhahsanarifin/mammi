import React, { useEffect, useState } from "react";

import axios from "axios";

import bangPutra from "../assets/images/bang-putra.png";

import Footer from "../components/Footer";

import Header from "../components/Header";

import styles from "../styles/Products.module.css";


const Products = () => {

  const [products, setProducts] = useState([]);

  const [promos, setPromos] = useState([]);

  const [query, setSearchProduct] = useState("");

  const getProducts = async () => {
    try {
      const repsonse = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products`
      );
      setProducts(repsonse.data.result.data);
      // console.log(repsonse.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPromos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos?page=1&limit=1`
      );
      setPromos(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
    getPromos();
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
        onChange={(e) => setSearchProduct(e.target.value)}
      />

      <main className={styles.main}>
        <aside
          className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
        >
          <h3 className={styles["promo__title"]}>Promo for you</h3>
          <p className={styles["promo__announcement"]}>
            Coupon will updated every weeks. Check them out
          </p>
          {promos.map((promo, index) => (
            <span className={styles["promo__card"]} key={index}>
              <img
                src={`${process.env.REACT_APP_BACKEND_HOST}${promo.image}`}
                alt="Product Promo"
              />
              <p>
                {promo.product_name} {promo.discount}% OFF
              </p>
              <span className={styles["promo__card__decs"]}>
                Buy 1 Choco Oreo and get 20% off for Beff Spaghetti
              </span>
              <span className={styles.coupon}>
                <p className={styles["coupon__title"]}>COUPON CODE</p>
                <h3>{promo.code}</h3>
                <p className={styles.description}>
                  Valid until October 10th 2020
                </p>
              </span>
            </span>
          ))}
          <button className={styles["btn-coupon"]}>Apply Coupon</button>
          <span className={styles["terms-and-condition"]}>
            <h3>Terms and Condition</h3>
            <p>1. You can only apply 1 coupon per day</p>
            <p>2. It only for dine in</p>
            <p>3. Buy 1 get 1only for new user</p>
            <p>4. Should make member card to apply coupon</p>
          </span>
        </aside>
        <section
          className={`${styles["main__right-side"]} ${styles["main__products"]}`}
        >
          <span className={styles["main__products__header"]}>
            <p className={styles["favor-products"]}>Favorite Product</p>
            <p className={styles["coffee-products"]}>Coffee</p>
            <p className={styles["non-coffee-products"]}>Non Coffee</p>
            <p className={styles.foods}>Foods</p>
            <p className={styles["Add-on"]}>Add-on</p>
          </span>
          <span
            className={`row gap-4 mx-5 ${styles["main__products__content"]}`}
          >
            {products
              .filter((product) => {
                if (query === "") {
                  return product;
                } else if (
                  product.product_name
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product, index) => (
                <span className={`col my-3 ${styles.product}`} key={index}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_HOST}${product.image}`}
                    alt={product.product_name}
                  />
                  <p className={styles["product__name"]}>
                    {product.product_name}
                  </p>
                  <p
                    className={styles["product__price"]}
                  >{`IDR ${product.price}`}</p>
                </span>
              ))}
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
