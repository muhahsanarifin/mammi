import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import styles from "../styles/Pagination.module.css";

const Paginations = ({ next, previous }) => {
  // console.log("Next: " + next);
  // console.log("Previous: " + previous);

  return (
    <>
      <span className={styles.pagination}>
        <Pagination>
          <PaginationItem>
            <PaginationLink href={next} previous style={{ color: "#6a4029" }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={previous} next style={{ color: "#6a4029" }} />
          </PaginationItem>
        </Pagination>
      </span>
    </>
  );
};

export default Paginations;
