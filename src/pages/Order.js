import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import cart from "../redux/actions/cart";
import { CartSingleProduct } from "../components/Cart";
import TransactionsAction from "../redux/actions/transactions";

import HeaderAdmin from "../components/admin/Header";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import PrivateRoute from "../utils/PrivateRoute";

import styles from "../styles/Checkout.module.css";
import creditCard from "../assets/icons/credit-card.svg";
import bankAccount from "../assets/icons/bank.svg";
import delivery from "../assets/icons/fast-delivery.svg";

const Order = () => {
  // const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");
  // TODO: Private Route
  PrivateRoute(!accessToken, -1);
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.cart.checkout);
  const orderSummaryOfCheckout = useSelector(
    (state) => state.cart.orderSummaryOfCheckout
  );

  const detail = useSelector((state) => state.profiles.resultProfileDetail[0]); // <= Convert to object result from state
  const contact = useSelector(
    (state) => state.profiles.resultProfileContact[0]
  );

  // Value Input Form
  const [address, setAddress] = useState(detail.address);
  const [telp, setTelp] = useState(contact.phone_number);
  const [payment_id, setPayment] = useState("");
  const [body, setBody] = useState({});

  // console.log(detail.address);
  // console.log(contact.phone_number);
  // console.log(payment_id);
  // console.log("checkout: ", checkout);
  // console.log("Order Summary  OfCheckout: ", orderSummaryOfCheckout);

  // const clearObj = (obj) => {
  //   Object.keys(obj).forEach((property) => {
  //     delete obj[property];
  //   });
  // };

  // const clearObj = (obj) => {
  //   for (const key in obj) {
  //     delete obj[key];
  //   }
  // };

  const clearObj = (obj) => {
    obj = {};
  };

  const handleDeleteProductForCheckout = () => {
    console.log("Accan");
    const deletedCeckout = clearObj(checkout);
    const deletedOrderSummaryOfCheckout = clearObj(orderSummaryOfCheckout);

    dispatch(cart.checkoutProductThunk(deletedCeckout));
    dispatch(cart.orderSummaryThunkOfCheckout(deletedOrderSummaryOfCheckout));

    setTimeout(() => {
      console.log("Deleted success.");
    }, 2500);

    window.location.replace("/products");
  };

  useEffect(() => {
    setBody({ address, telp, payment_id });
  }, [payment_id, telp, address]);

  console.log("Other Body: ", body);

  const resFullfilled = () => {
    setTimeout(() => {
      console.log("Transaction successfully");
    }, 2500);

    window.location.replace("/history");
  };

  const handleConfirmAndDelivery = () => {
    const combineChecoutOfSingleProduct = {
      ...checkout,
      ...body,
    };

    // console.log("Body of checkout", checkout);
    // console.log(
    //   "Body checout of single product",
    //   combineChecoutOfSingleProduct
    // );

    dispatch(
      TransactionsAction.createTransactionThunk(
        combineChecoutOfSingleProduct,
        accessToken,
        resFullfilled
      )
    );

    const deletedCeckout = clearObj(checkout);
    const deletedOrderSummaryOfCheckout = clearObj(orderSummaryOfCheckout);

    dispatch(cart.checkoutProductThunk(deletedCeckout));
    dispatch(cart.orderSummaryThunkOfCheckout(deletedOrderSummaryOfCheckout));
  };

  return (
    <>
      <TitleBar title={`MAMMI | Orders`} />
      {accessRole === "Admin" ? <HeaderAdmin /> : <Header />}
      <main className={styles.main}>
        <section className={styles.title}>
          {accessRole === "Admin" ? (
            <h3>Finish your customer order now.</h3>
          ) : (
            <h3>Checkout your item now!</h3>
          )}
        </section>
        <section className={styles.sides}>
          <span className={styles["left-side"]}>
            <span className={styles["order-summary"]}>
              {/* Order Summary Of Checkout Single */}
              {orderSummaryOfCheckout?.product_name ? (
                <CartSingleProduct
                  orderSummaryOfCheckout={orderSummaryOfCheckout}
                  handleDeleteProduct={handleDeleteProductForCheckout}
                />
              ) : (
                <span className={styles["cart-empty-section"]}>
                  <p className={styles["cart-empty-section__font"]}>
                    Your cart is empty
                  </p>
                </span>
              )}
            </span>
          </span>
          <span className={styles["right-side"]}>
            {accessRole === "Customer" && (
              <span className={styles["right-side__address-details"]}>
                <span className={styles["address-detail-top"]}>
                  <p>Address details</p>
                  <p className={styles["address-btn-edit"]}>Edit</p>
                </span>
                <span className={styles["address-detail-bottom"]}>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    className={styles["address"]}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="number"
                    name="telp"
                    id="telp"
                    value={telp}
                    className={styles["telp"]}
                    onChange={(e) => setTelp(e.target.value)}
                  />
                </span>
              </span>
            )}
            {accessRole === "Customer" && (
              <span className={styles["right-side__payment-method"]}>
                <span className={styles["right-side__payment-method__title"]}>
                  <p>Payment Method</p>
                </span>
                <span className={styles["right-side__payment-method__types"]}>
                  <span className={styles["payment-method__card"]}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={1}
                      onChange={(e) => setPayment(e.target.value)}
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
                      onChange={(e) => setPayment(e.target.value)}
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
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <label>
                      <img src={delivery} alt="Cash on Delivery" />
                      Cash on Delivery
                    </label>
                  </span>
                </span>
              </span>
            )}
            {accessRole === "Admin" ? (
              <button className={styles["confirm-and-pay"]}>
                Mark as done
              </button>
            ) : (
              <button
                className={styles["confirm-and-pay"]}
                onClick={handleConfirmAndDelivery}
              >
                Confirm and Pay
              </button>
            )}
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Order;
