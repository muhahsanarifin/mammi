import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TransactionsAction from "../../redux/actions/transactions";

import styles from "../../styles/admin/ProductOrder.module.css";

const ProductOrder = ({ status, customer, onSetOrderId }) => {
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  // const [status, setStatus] = useState("Pending");
  const [products, setProducts] = useState([]);
  // const [orderId, setOrderId] = useState();
  const accessToken = localStorage.getItem("access-token");
  const dispatch = useDispatch();

  const resFullfilled = (data) => {
    setProducts(data);
    // console.log("Data customer transactions: ", data);
  };

  useEffect(() => {
    dispatch(
      TransactionsAction.getTransactionsThunk(
        accessToken,
        `page=${page}&limit=${limit}&status=${status}&customer=${customer}`,
        resFullfilled
      )
    );
  }, [dispatch, accessToken, page, limit, status, customer]);

  // console.log(orderId)

  return (
    <>
      {/* <span>Product Order</span> */}
      <ul className={styles["order-summary__products"]}>
        {products.map((product) => (
          <li
            className={styles["order-summary__product"]}
            onClick={
              product?.status === "Pending"
                ? (e) => onSetOrderId(product.id)
                : null
            }
          >
            <img src={product.image} alt={product.product_name} />
            <span className={styles["order-summary__product__entity"]}>
              <p className={styles["product__item"]}>{product.product_name}</p>
              <p className={styles["product__qty"]}>x{product.qty}</p>
              <p className={styles["product__size"]}>{product.size}</p>
            </span>
            <span className={styles["order-summary__product__price"]}>
              <p className={styles["product__price"]}>IDR {product.subtotal}</p>
              {product?.status === "Pending" ? (
                <p className={styles["status-pending"]}>{product.status}</p>
              ) : (
                <p className={styles["status-delivered"]}>{product.status}</p>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductOrder;
