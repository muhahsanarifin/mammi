import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

import styles from "../styles/WelcomeToast.module.css"

const WelcomeToast = () => {
  const navigation = useNavigate();

  return (
    <Toast className={styles["toast"]}>
      <ToastHeader className={styles["header"]}>
        <p>Welcome to MAMMI</p>
      </ToastHeader>
      <ToastBody>
        <p className={styles["decs"]}>
          Feel free, register via {" "}
          <span onClick={() => navigation("/sign-up")}>Sign Up</span> or
          use demo account this bellow.
        </p>
        <p className={styles["title"]}>Admin</p>
        <ul className={styles["list"]}>
          <li>adminmammi@gmail.com | admin</li>
        </ul>
        <p className={styles["title"]}>Cutomer</p>
        <ul className={styles["list"]}>
          <li>customermammi@gmail.com | customer</li>
        </ul>
      </ToastBody>
    </Toast>
  );
};

export default WelcomeToast;
