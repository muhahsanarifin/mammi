import React from "react";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import styles from "../styles/Pagination.module.css";

const Paginations = ({
  totalPages,
  // limitPage,
  currentPage,
  setcurrentPage,
}) => {
  // console.log("currentPage: " + currentPage);
  // console.log("totalPages: " + totalPages);
  // console.log("limitPage: " + limitPage);
  // console.log("securrentPage:" + setcurrentPage);

  let pages = [];

  for (let idx = 1; idx <= totalPages; idx++) {
    // console.log(pages.push(idx));
    pages.push(idx);
  }

  return (
    <>
      <span className={styles.pagination}>
        {/* || Research */}
        {/* <Pagination>
          <PaginationItem>
            <PaginationLink href={previous} previous style={{ color: "#6a4029" }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={next} next style={{ color: "#6a4029" }} />
          </PaginationItem>
        </Pagination> */}

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
      </span>
    </>
  );
};

export default Paginations;
