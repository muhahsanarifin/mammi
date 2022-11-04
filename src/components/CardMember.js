import React from "react";

import { Link } from "react-router-dom";

import styles from "../styles/CardMember.module.css";

function Card() {
  return (
    <>
      <section className={styles["member-cards"]}>
        <span>
          <h3>Get your member card now!</h3>
          <p>Lets join with our member and enjoy the deals</p>
        </span>
        <Link to={`/sign-up`}>
          <button className={styles["btn-create-member"]}>Create Now</button>
        </Link>
      </section>
    </>
  );
}

export default Card;
