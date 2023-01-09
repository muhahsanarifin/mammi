import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import pen from "../assets/icons/pen.svg";

const Product = ({
  productId,
  productImage,
  productName,
  prodcutPrice,
}) => {
  const navigation =useNavigate()
  const accessRole = localStorage.getItem("access-role");
  return (
    <>
      {
        <span className={`col my-3 ${styles.product}`} key={productId}>
          <Link to={`/product/${productId}`}>
            <img
              src={productImage}
              alt={productName}
              className={styles["image-product"]}
            />
          </Link>
          <p className={styles["product__name"]}>{productName}</p>
          <p className={styles["product__price"]}>{`IDR ${prodcutPrice}`}</p>
          {accessRole === "Admin" ? (
            <span
              className={styles["btn-product"]}
              onClick={() => navigation(`/product/${productId}/edit`)}
            >
              <img
                src={pen}
                alt="btn-product"
                className={styles["btn-product-icon"]}
              />
            </span>
          ) : null}
        </span>
      }
    </>
  );
};

export default Product;
