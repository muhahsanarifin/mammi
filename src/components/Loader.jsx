import React from "react";

import styles from "../styles/Loader.module.css";

const Loader = ({ styleSection }) => {
  return (
    <span className={styleSection}>
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </span>
  );
};

export default Loader;
