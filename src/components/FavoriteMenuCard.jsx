import React from "react";
import styles from "../styles/FavoriteMenuCard.module.css";

const FavoriteMenuCard = ({ imgSrc, altNameProduct }) => {
  return (
    <div className={styles["pricing-table__column"]}>
      <img src={imgSrc} alt={altNameProduct} />
      <span className={styles.title}>
        <p>Hazelnut Latte</p>
      </span>
      <span className={styles.description}>
        <ul>
          <li>HazelnuSyrup</li>
          <li>Vanilla Whipped Cream</li>
          <li>Ice / Hot</li>
          <li>Sliced Banana on Top</li>
        </ul>
      </span>
      <span className={styles.price}>
        <p>IDR 25.000</p>
      </span>
      <span className={styles["btn-price"]}>
        <button>Order Now</button>
      </span>
    </div>
  );
};

export default FavoriteMenuCard;
