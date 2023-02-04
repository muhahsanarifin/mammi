import React, { useEffect, useState } from "react";
import { paginateProduct } from "../utils/api/products";

import styles from "../styles/Pagination.module.css";

const Paginations = ({
  // totalPages,
  // limitPage,
  // currentPage,
  // setcurrentPage,
  setDataProductsOfPagination,
  initData,
}) => {
  const datas = initData;
  const [urlNext, setUrlNext] = useState(datas?.next);
  const [urlPrev, setUrlPrev] = useState(datas?.previous);
  useEffect(() => {
    setUrlNext(datas?.next);
    setUrlPrev(datas?.previous);
  }, [datas?.next, datas?.previous]);

  const handlePrev = async () => {
    const response = await paginateProduct(urlPrev);
    setDataProductsOfPagination(response.data.result.data);
    setUrlPrev(response.data.result.previous);
    setUrlNext(response.data.result.next);
  };

  const handleNext = async () => {
    const response = await paginateProduct(urlNext);
    setDataProductsOfPagination(response.data.result.data);
    setUrlNext(response.data.result.next);
    setUrlPrev(response.data.result.previous);
  };

  // Second way
  // let pages = [];
  // for (let idx = 1; idx <= totalPages; idx++) {
  //   console.log(pages.push(idx));
  //   pages.push(idx);
  // }

  return (
    <>
      <div className={styles["pagination-section"]}>
        {urlPrev !== null ? (
          <button
            className={styles["pagination-btn-next"]}
            onClick={handlePrev}
          >
            Previous
          </button>
        ) : null}
        {urlNext !== null ? (
          <button
            className={styles["pagination-btn-prev"]}
            onClick={handleNext}
          >
            Next
          </button>
        ) : null}
      </div>

      {/* Second way */}
      {/* <span className={styles.pagination}>
        {pages.map((page, idx) => (
          <button
            key={idx}
            className={
              page === currentPage
                ? styles["active-pagination-btn"]
                : styles["pagination-btn"]
            }
            onClick={() => setcurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </span> */}
    </>
  );
};

export default Paginations;
