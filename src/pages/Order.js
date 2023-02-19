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

import styles from "../styles/Checkout.module.css";
import AddressDetails from "../components/AddressDetails";
import PaymentMethod from "../components/PaymentMethod";
import CustomersList from "../components/admin/Customers";
import StatusList from "../components/admin/Status";
import {
  ProductOrder,
  ProudctOrderPagination,
} from "../components/admin/ProductOrder";

const Order = () => {
  // const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");
  const [handleAddressDetail, setHandleAddressDetail] = useState(true);
  const [productOrder, setProductOrder] = useState([]);

  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.cart.checkout);
  const orderSummaryOfCheckout = useSelector(
    (state) => state.cart.orderSummaryOfCheckout
  );

  const detail = useSelector(
    (state) => state.profiles.resultProfileDetail.result[0]
  );
  const contact = useSelector(
    (state) => state.profiles.resultProfileContact.result[0]
  );

  // Product Order
  const [status, setStatus] = useState("Pending");
  const [customer, setCustomer] = useState("");
  const [orderId, setOrderId] = useState();

  // Another value which display on order side admin.
  // const [display_name, setDisplayName] = useState(detail.display_name);

  // Value Input Form
  const [address, setAddress] = useState(detail?.address);
  const [telp, setTelp] = useState(contact?.phone_number);
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
    // console.log("Accan");
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

  // console.log("Other Body: ", body);

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

  // Handle Mark as done

  // const handlemarkAsDone = () => {
  //   console.log("Order Id: ", orderId);
  //   setTimeout(() => {
  //     console.log("Success");
  //   }, 2500);

  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 5000);
  // };

  const resUpdatedStasusFulfilled = (data) => {
    console.log(data);
    setTimeout(() => {
      console.log("Success");
    }, 2500);

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const handlemarkAsDone = () => {
    const body = {
      status: "Delivered",
    };

    dispatch(
      TransactionsAction.updateStatusTransactionThunk(
        orderId,
        body,
        accessToken,
        resUpdatedStasusFulfilled
      )
    );
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
            {/* Customer & Admin */}
            {accessRole === "Customer" ? (
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
            ) : (
              <>
                <ProductOrder
                  status={status}
                  customer={customer}
                  onSetOrderId={setOrderId}
                  onProducctOrder={productOrder}
                  onsetProductOrder={setProductOrder}
                />
                <ProudctOrderPagination
                  token={accessToken}
                  onsetProductOrder={setProductOrder}
                />
              </>
            )}
          </span>
          <span className={styles["right-side"]}>
            {/* Customer & Admin */}
            <span className={styles["right-side__address-details"]}>
              {accessRole === "Customer" ? (
                <>
                  <span className={styles["address-detail-top"]}>
                    <p>Address details</p>
                    <p
                      className={styles["address-btn-edit"]}
                      onClick={() =>
                        setHandleAddressDetail(!handleAddressDetail)
                      }
                    >
                      Edit
                    </p>
                  </span>
                  <AddressDetails
                    address={address}
                    onSetAddress={(e) => setAddress(e.target.value)}
                    telp={telp}
                    onsetTelp={(e) => setTelp(e.target.value)}
                    onDisable={handleAddressDetail}
                  />
                </>
              ) : (
                <>
                  <span className={styles["address-detail-top"]}>
                    <p>Customers list</p>
                  </span>
                  <CustomersList onCustomers={setCustomer} />
                </>
              )}
            </span>
            {/* Customer & Admin */}
            <span className={styles["right-side__payment-method"]}>
              {accessRole === "Customer" ? (
                <>
                  <span className={styles["right-side__payment-method__title"]}>
                    <p>Payment Method</p>
                  </span>
                  <PaymentMethod
                    onSetPayment={(e) => setPayment(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <span className={styles["right-side__payment-method__title"]}>
                    <p>Status list</p>
                  </span>
                  <StatusList onFilter={setStatus} />
                </>
              )}
            </span>
            {/* Customer & Admin */}
            {accessRole === "Admin" ? (
              <button
                className={
                  !orderId
                    ? styles["mark-as-done"]
                    : styles["mark-as-done-active"]
                }
                onClick={handlemarkAsDone}
                disabled={!orderId}
              >
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
