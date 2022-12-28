import React from "react";
import customer from "../assets/images/customer.svg";
import star from "../assets/icons/star.svg";
import styles from "../styles/TestimonialCard.module.css"

const TestimonialCard = () => {
  return (
    <>
      <span className={styles["testimonial__customer"]}>
        <span className={styles["testimonial__customer__identity"]}>
          <img
            src={customer}
            alt="Customer"
            className={styles["testimonial__identity__avatar"]}
          />
          <span className={styles["testimonial__identity__profile"]}>
            <h3 className={styles["profile__name"]}>Viezh Robert</h3>
            <p className={styles["profile__location"]}>Warsaw, poland</p>
          </span>
          <span className={styles["testimonial__ratings"]}>
            <p>4.5</p>
            <img src={star} alt="star" />
          </span>
        </span>
        <p className={styles["testimonials__comment"]}>
          “Wow... I am very happy to spend my whole day here. the Wi-fi is good,
          and the coffee and meals tho. I like it here!! Very recommended!
        </p>
      </span>
    </>
  );
};

export default TestimonialCard;
