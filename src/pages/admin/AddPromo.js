import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import HeaderAdmin from "../../components/admin/Header";
import { CameraOutlined } from "@ant-design/icons";
import styles from "../../styles/admin/AddPromo.module.css";
import PrivateRoute from "../../utils/PrivateRoute";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import productsAction from "../../redux/actions/products";

const AddPromo = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [product_id, setProductId] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [start_active_date, setStartActiveDate] = useState("");
  const [image, setProductImage] = useState("");
  const [product_name, setProductName] = useState("");
  const accessToken = localStorage.getItem("access-token");
  const [products, setProducts] = useState([]);
  // TODO: Private Route
  PrivateRoute(!accessToken, -1);

  // TODO: Persent Discount
  const persentDiscounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const resPending = () => {};

  const resFullfilled = (data) => {
    setProducts(data);
  };

  const resError = () => {};

  const resFinally = () => {};

  useEffect(() => {
    dispatch(
      productsAction.getProductsThunk(
        resPending,
        resFullfilled,
        resError,
        resFinally
      )
    );
  }, [dispatch]);

  const handleSavePromo = async () => {
    if (product_id.length === 0) {
      return console.log("Please, Input id product!");
    }
    if (expiry_date.length === 0) {
      return console.log("Please, Input expiry date!");
    }
    if (start_active_date.length === 0) {
      return console.log("Please, Input start active date!");
    }
    if (discount.length === 0) {
      return console.log("Please, Input discount!");
    }
    if (code.length === 0) {
      return console.log("Please, Input code!");
    }
    if (description.length === 0) {
      return console.log("Please, Input description!");
    }

    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos/create`,
        {
          product_id,
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
      if (response.status === 201) {
        console.log(response.data.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancleInput = () => {
    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  // console.log({
  //   product_id,
  //   code,
  //   discount,
  //   expiry_date,
  //   start_active_date,
  //   description,
  // });

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
                Add new promo
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
                {!image ? (
                  <div className={styles["camera-outlined"]}>
                    <CameraOutlined
                      style={{
                        fontSize: "32px",
                        color: "#9f9f9f",
                        border: "1px solid",
                        height: "115px",
                        width: "115px",
                        borderRadius: "100%",
                        paddingTop: "2.5rem",
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={image}
                    alt="products"
                    className={styles["product-image"]}
                  />
                )}
                <p>
                  {product_name} {discount}% OFF
                </p>
                <span className={styles["promo__card__decs"]}>
                  {description}
                </span>
                <span className={styles.coupon}>
                  <p className={styles["coupon__title"]}>COUPON CODE</p>
                  <h3>{code}</h3>
                  <p className={styles.description}>
                    Valid until {expiry_date}
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
                  value={product_name}
                  placeholder="Product name input automatically"
                  style={{ cursor: "no-drop" }}
                  disable
                />
              </label>
              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  placeholder="Product price input automatically"
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
                  placeholder="Describe your promo min. 150 characters"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </span>
          </span>
          <span className={styles["bottom-components"]}>
            <span className={styles["left-compact-component"]}>
              <span className={styles.stock}>
                <label htmlFor="product">Enter the product</label>
                <span className={styles["stock-component"]}>
                  <select
                    name="product"
                    id="product"
                    onChange={(e) => {
                      setProductId(e.target.value.split(" ")[0]);
                      setPrice(
                        e.target.value
                          .split(" ")
                          .slice(1, 2)
                          .toString()
                          .replace(",", " ")
                      );

                      setProductImage(
                        e.target.value
                          .split(" ")
                          .slice(2, 3)
                          .toString()
                          .replace(",", " ")
                      );
                      setProductName(
                        e.target.value
                          .split(" ")
                          .slice(3)
                          .toString()
                          .replace(",", " ")
                      );
                    }}
                  >
                    <option
                      style={{
                        color: "#6a4029",
                        fontWeight: 800,
                        fontSize: "14px",
                        display: "none",
                      }}
                    >
                      Choose product
                    </option>
                    <option
                      style={{
                        color: "#ffba33",
                        fontWeight: "800",
                        fontSize: "12px",
                      }}
                      disabled
                    >
                      Id Product | Name Product
                    </option>
                    {products.map((product) => (
                      <option
                        value={`${product.id} ${product.price} ${product.image} ${product.product_name}`}
                      >
                        {product.id} | {product.product_name}
                      </option>
                    ))}
                  </select>
                </span>
              </span>

              <span className={styles.stock}>
                <span className={styles.stock}>
                  <label htmlFor="code">Input coupon code:</label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </span>
              </span>
            </span>
            <span className={styles["rigth-compact-component"]}>
              <span className={styles.stock}>
                <label htmlFor="discount">Enter the discount:</label>
                <span className={styles["stock-component"]}>
                  <select
                    name="discount"
                    id="discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  >
                    <option
                      style={{
                        fontWeight: 800,
                        fontSize: "14px",
                        display: "none",
                      }}
                    >
                      Input discount
                    </option>
                    {persentDiscounts.map((persentDiscount) => (
                      <option value={persentDiscount}>
                        {" "}
                        {persentDiscount}%
                      </option>
                    ))}
                  </select>
                </span>
              </span>
              <span className={styles.date}>
                <label htmlFor="">Expire date:</label>
                <span className={styles["delivery__components"]}>
                  <input
                    type="date"
                    name="start_active_date"
                    id="start_active_date"
                    value={start_active_date}
                    onChange={(e) => setStartActiveDate(e.target.value)}
                  />
                  <input
                    type="date"
                    name="expiry_date"
                    id="expiry_date"
                    value={expiry_date}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </span>
              </span>
              {/* <span className={styles.size}>
                <label htmlFor="#">Input product size:</label>
                <p>click methods you want to use for this product</p>
                <span className={styles["size_type"]}>
                  <ul>
                    <li>R</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>250 gram</li>
                    <li>300 gram</li>
                    <li>500 gram</li>
                  </ul>
                </span>
              </span> */}
              {/* <span className={styles["delivery-entity"]}>
                <label htmlFor="#">Input delivery methods:</label>
                <p>Click methods you want to use for this product</p>
                <ul className={styles["delivery-methods"]}>
                  <li>Home Delivery</li>
                  <li>Dine in</li>
                  <li>Take away</li>
                </ul>
              </span> */}
              <span className={styles["btn-product"]}>
                <button
                  className={
                    !product_name ||
                    !price ||
                    !product_id ||
                    !image ||
                    !discount ||
                    !code ||
                    !expiry_date ||
                    !start_active_date ||
                    !description
                      ? styles["btn-product__save"]
                      : styles["btn-product__save-active"]
                  }
                  disabled={
                    !product_name ||
                    !price ||
                    !product_id ||
                    !expiry_date ||
                    !start_active_date ||
                    !description
                  }
                  onClick={handleSavePromo}
                >
                  Save Promo
                </button>
                <button
                  className={
                    !product_name &&
                    !price &&
                    !product_id &&
                    !image &&
                    !discount &&
                    !code &&
                    !expiry_date &&
                    !start_active_date &&
                    !description
                      ? styles["btn-products__cancel"]
                      : styles["btn-products__cancel-active"]
                  }
                  onClick={handleCancleInput}
                >
                  Cancel
                </button>
              </span>
            </span>
          </span>
        </section>
        <section></section>
      </main>
    </>
  );
};

export default AddPromo;
