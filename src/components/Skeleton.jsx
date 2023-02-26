import React from "react";

import styles from "../styles/Skeleton.module.css";

const ProductCardSkeleton = ({ products }) => { // Developer does not use it temporarily
  return (
    <>
      {products.map((product) => (
        <span className={`col my-3 ${styles.product}`} key={product.id}>
          <div className={styles["product__image"]}></div>
          <div className={styles["product__decs"]}>
            <div className={styles["product__name"]}></div>
            <div className={styles["product__price"]}></div>
          </div>
        </span>
      ))}
    </>
  );
};

const PromoCardSkeleton = () => {
  return (
    <>
      <span className={styles["promo__card"]}>
        <div className={styles["promo__image"]}></div>
        <div className={styles["title__promo"]}></div>
        <div className={styles["promo__card__decs"]}></div>
        <div className={styles.coupon}>
          <div className={styles["coupon__title"]}></div>
          <div className={styles.description}></div>
        </div>
      </span>
    </>
  );
};

export { ProductCardSkeleton, PromoCardSkeleton };
