import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import HeaderAdmin from "../../components/admin/Header";
import styles from "../../styles/admin/EditPromo.module.css";
import PrivateRoute from "../../utils/PrivateRoute";

const EditPromo = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [promo, setPromo] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [start_active_date, setStartActiveDate] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");

  // TODO: Private Route
  PrivateRoute(!accessToken, -1);

  // TODO: Persent Discount
  const persentDiscounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  // console.log(persentDiscounts);
  // console.log(typeof persentDiscounts);

  // TODO: Get Promos
  const getPromos = async () => {
    try {
      // setLoadPromo(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos/${id}`
      );
      // console.log(response.data.result[0]);
      setPromo(response.data.result[0]);
    } catch (error) {
      // setLoadPromo(true);
      console.log(error.message);
    } finally {
      // setLoadPromo(false);
    }
  };
  useEffect(() => {
    getPromos();
  }, []);

  // const handleSave = () => {
  //   if (code.length === 0) {
  //     return console.log("Please, Input code!");
  //   }
  //   if (discount.length === 0) {
  //     return console.log("Please, Input code");
  //   }
  //   console.log(code === null || code === undefined ? id : code);
  //   console.log(code);
  //   console.log(discount);
  //   console.log(start_active_date);
  //   console.log(description);
  //   console.log(expiry_date);
  // };

  useEffect(() => {
    setCode(promo.code);
    setStartActiveDate(promo.start_active_date);
    setExpiryDate(promo.expiry_date);
    setDescription(promo.description);
  }, [
    promo.code,
    promo.start_active_date,
    promo.expiry_date,
    promo.description,
  ]);

  const handleSave = async () => {
    if (code.length === 0) {
      return console.log("Please, Input code!");
    }
    if (discount.length === 0) {
      return console.log("Please, Input code");
    }
    try {
      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_HOST}/api/v1/promos/edit/${id}`,
        {
          code,
          discount,
          expiry_date,
          start_active_date,
          description,
        },
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.result.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <main className={styles.main}>
        <section className={styles.breadcrumb}>
          <nav className={styles["breadcrumb-nav"]}>
            <ul className={styles["breadcrumb-list"]}>
              <li className={styles["breadcrumb-item"]}>
                <Link to={`/products`}>Favorite & Promo</Link>
              </li>
              <li
                className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-divider"]}`}
              >
                Edit promo
              </li>
              <li
                className={`${styles["breadcrumb-item"]} ${styles["cancel-btn"]}`}
                onClick={() => navigation(-1)}
              >
                Cancel
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles["main__contents"]}>
          <span className={styles["identity-product"]}>
            <span
              className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
            >
              <span className={styles["promo__card"]}>
                <img src={promo.image} alt={promo.product_name} />
                <p>{promo.product_name}</p>
                {/* <span className={styles["btn-profile"]}>
                  <input type="file"/>
                </span> */}
                <span className={styles["promo__card__decs"]}>
                  {promo.description}
                </span>
                <span className={styles.coupon}>
                  <p className={styles["coupon__title"]}>COUPON CODE</p>
                  <h3>{promo.code}</h3>
                  <p className={styles.description}>
                    Valid until {promo.expiry_date}
                  </p>
                </span>
              </span>
            </span>
            <span className={styles["description-products"]}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={promo.product_name}
                  style={{ cursor: "no-drop" }}
                  disabled
                />
              </label>
              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={promo.price}
                  placeholder="Type the price"
                  style={{ cursor: "no-drop" }}
                  disabled
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe your product min. 150 characters"
                  value={description ?? ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </span>
          </span>
          <span className={styles["delivery-size-btn-section"]}>
            <span className={styles["main-delivery"]}>
              <span className={styles.delivery}>
                <label htmlFor="expireDate">Expire date:</label>
                <span className={styles["delivery__components"]}>
                  <input
                    type="date"
                    name="startDate"
                    className={styles["start-date"]}
                    id="startDate"
                    value={start_active_date}
                    onChange={(e) => setStartActiveDate(e.target.value)}
                  />
                  <input
                    type="date"
                    name="expireDate"
                    value={expiry_date}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className={styles["expire-date"]}
                    id="expireDate"
                  />
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="promoCode">Input promo code:</label>
                <input
                  type="text"
                  id="promoCode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </span>
            </span>
            <span className={styles["compact-component"]}>
              <span className={styles.size}>
                <label htmlFor="#">Input product size:</label>
                <p>click methods you want to use for this product</p>
                <span className={styles["size_type"]}>
                  <ul>
                    <li>R</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>250 gr</li>
                    <li>300 gr</li>
                    <li>500 gr</li>
                  </ul>
                </span>
              </span>
              <span className={styles["delivery-entity"]}>
                <label htmlFor="#">Input delivery methods:</label>
                <p>Click methods you want to use for this product</p>
                <ul className={styles["delivery-methods"]}>
                  <li>Home Delivery</li>
                  <li>Dine in</li>
                  <li>Take away</li>
                </ul>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Enter the discount:</label>
                <span className={styles["stock-component"]}>
                  <select onChange={(e) => setDiscount(e.target.value)}>
                    <option
                      disabled
                      style={{ fontWeight: 800, fontSize: "14px" }}
                    >
                      Enter the discount
                    </option>
                    {persentDiscounts.map((persentDiscount) => (
                      <option value={persentDiscount}>
                        {persentDiscount}%
                      </option>
                    ))}
                  </select>
                </span>
              </span>
              <span className={styles["btn-product"]}>
                <button
                  className={styles["btn-product__save"]}
                  onClick={handleSave}
                >
                  Save Change
                </button>
                {/* <button className={styles["btn-products__cancel"]}>
                  Cancel
                </button> */}
              </span>
            </span>
          </span>
        </section>
      </main>
    </>
  );
};

export default EditPromo;
