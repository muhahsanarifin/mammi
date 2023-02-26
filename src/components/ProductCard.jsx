import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import pen from "../assets/icons/pen.svg";

const Product = ({ products }) => {
  const navigation = useNavigate();
  const accessRole = localStorage.getItem("access-role");
  return (
    <>
      {products.map((product) => (
        <>
          <span className={`col my-3 ${styles.product}`} key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.product_name}
                className={styles["image-product"]}
              />
            </Link>
            <p className={styles["product__name"]}>{product.product_name}</p>
            <p className={styles["product__price"]}>{`IDR ${product.price}`}</p>
            {accessRole === "Admin" ? (
              <span
                className={styles["btn-product"]}
                onClick={() => navigation(`/product/${product.id}/edit`)}
              >
                <img
                  src={pen}
                  alt="btn-product"
                  className={styles["btn-product-icon"]}
                />
              </span>
            ) : null}
          </span>
        </>
      ))}
    </>
  );
};

export default Product;
