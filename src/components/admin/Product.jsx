import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/admin/Product.module.css";

const Product = ({
  productKey,
  productId,
  productImage,
  productName,
  prodcutPrice,
}) => {
  return (
    <>
      {
        <span className={`col my-3 ${styles.product}`} key={productKey}>
          <Link to={productId}>
            <img src={productImage} alt={productName} />
          </Link>
          <p className={styles["product__name"]}>{productName}</p>
          <p className={styles["product__price"]}>{`IDR ${prodcutPrice}`}</p>
        </span>
      }
    </>
  );
};

export default Product;
