import React from "react";

import styles from "../styles/Skeleton.module.css";

const Skeleton = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <span className={`col my-3 ${styles.product}`}>
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

export default Skeleton;
