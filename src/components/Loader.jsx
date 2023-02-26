import React from "react";

import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <span className={styles["loader-section"]}>
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </span>
  );
};

export default Loader;
