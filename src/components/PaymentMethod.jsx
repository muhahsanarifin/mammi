import React from "react";

import styles from "../styles/PaymentMethod.module.css"
import creditCard from "../assets/icons/credit-card.svg";
import bankAccount from "../assets/icons/bank.svg";
import delivery from "../assets/icons/fast-delivery.svg";

const PaymentMethod = ({onSetPayment}) => {
  return (
    <span className={styles["right-side__payment-method__types"]}>
      <span className={styles["payment-method__card"]}>
        <input
          type="radio"
          name="paymentMethod"
          value={1}
          onChange={onSetPayment}
        />
        <label>
          <img src={creditCard} alt="Card" />
          Card
        </label>
      </span>
      <span className={styles["bank-account"]}>
        <input
          type="radio"
          name="paymentMethod"
          value={2}
          onChange={onSetPayment}
        />
        <label>
          <img src={bankAccount} alt="Bank Account" />
          Bank Account
        </label>
      </span>
      <span className={styles["cash-on-delivery"]}>
        <input
          type="radio"
          name="paymentMethod"
          value={3}
          onChange={onSetPayment}
        />
        <label>
          <img src={delivery} alt="Cash on Delivery" />
          Cash on Delivery
        </label>
      </span>
    </span>
  );
};

export default PaymentMethod;
