import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionsAction from "../../redux/actions/transactions";
import { paginateProductOrder } from "../../utils/api/transactions";

import styles from "../../styles/admin/ProductOrder.module.css";

const ProductOrder = ({
  status,
  customer,
  onSetOrderId,
  onsetProductOrder,
  onProducctOrder,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const accessToken = localStorage.getItem("access-token");
  const dispatch = useDispatch();

  const resFullfilled = (data) => {
    onsetProductOrder(data);
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

  return (
    <>
      <ul className={styles["order-summary__products"]}>
        {onProducctOrder.map((product) => (
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

const ProudctOrderPagination = ({ token, onsetProductOrder }) => {
  // Data of paginations
  const resultTransactions = useSelector(
    (state) => state.transactions.resultTransactions
  );

  // console.log("Data Count: ", resultTransactions?.dataCount);
  // console.log("Next: ", resultTransactions?.next);
  // console.log("Prev: ", resultTransactions?.previous);
  // console.log("Total Pages: ", resultTransactions?.totalPages);

  const [urlNext, setUrlNext] = useState(resultTransactions?.next);
  const [urlPrev, setUrlPrev] = useState(resultTransactions?.previous);

  useEffect(() => {
    setUrlNext(resultTransactions?.next);
    setUrlPrev(resultTransactions?.previous);
  }, [resultTransactions?.next, resultTransactions?.previous]);

  // Handle Pagination
  const handleNext = async () => {
    const response = await paginateProductOrder(urlNext, token);
    onsetProductOrder(response.data.result.data);
    setUrlNext(response.data.result.next);
    setUrlPrev(response.data.result.previous);
    // console.log("Next data: ", response.data.result.next);
    // console.log("Prev data: ", response.data.result.previous);
  };

  // console.log("Sample next: ", urlNext);
  // console.log("Sample prev: ", urlPrev);

  const handlePrev = async () => {
    const response = await paginateProductOrder(urlPrev, token);
    onsetProductOrder(response.data.result.data);
    setUrlPrev(response.data.result.previous);
    setUrlNext(response.data.result.next);
    // console.log("Prev data: ", response.data.result.previous);
  };

  return (
    <>
      <span className={styles["pagination-section"]}>
        {urlPrev !== null ? (
          <button onClick={handlePrev} className={styles["btn-prev"]}>
            Previous
          </button>
        ) : null}
        {urlNext !== null ? (
          <button onClick={handleNext} className={styles["btn-next"]}>
            Next
          </button>
        ) : null}
      </span>
    </>
  );
};

export { ProductOrder, ProudctOrderPagination };
