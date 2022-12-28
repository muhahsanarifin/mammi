import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

import HeaderAdmin from "../../components/admin/Header";
import { CameraOutlined } from "@ant-design/icons";
import styles from "../../styles/admin/AddProduct.module.css";

const AddProduct = () => {
  const [prevImage, setPrevImage] = useState(null);
  const [image, setImage] = useState(null);
  const [product_name, setProductName] = useState("");
  const [category_id, setCategory] = useState(1);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleUploadeImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setImage(uploaded);
  };

  const handleSaveProduct = async () => {
    let formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("product_name", product_name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);

    let body = formData;

    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/create`,
        body,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response.data.result);
      if (response.status === 200) {
        console.log("success");
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
                Add new product
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles["main__contents"]}>
          <span className={styles["identity-product"]}>
            <span className={styles["identity-product-picture"]}>
              <span className={styles["product-image"]}>
                {prevImage === null ? (
                  <CameraOutlined
                    style={{
                      fontSize: "32px",
                      color: "#9f9f9f",
                      position: "absolute",
                      top: "2.1rem",
                      left: "2.1rem",
                    }}
                  />
                ) : (
                  <img
                    src={prevImage}
                    alt={``}
                    className={styles["product-image"]}
                  />
                )}
              </span>
              <span className={styles["product-input"]}>
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  className={styles.picture}
                  onChange={handleUploadeImage}
                />
                <input
                  type="file"
                  name="picture"
                  capture="camera"
                  className={styles.galery}
                  disabled
                />
              </span>
            </span>
            <span className={styles["description-products"]}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="product_name"
                  id="name"
                  placeholder="Type product name min. 50 characters"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </label>
              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Type the price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe your product min. 150 characters"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </span>
          </span>
          <span className={styles["compact-components-section"]}>
            <span className={styles["left-side-compact-component"]}>
              <span className={styles.category}>
                <label htmlFor="#">Input Category:</label>
                <span className={styles["category-component"]}>
                  <select
                    name="category_id}"
                    value={category_id}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option
                      disabled
                      style={{ fontWeight: 800, fontSize: "14px" }}
                    >
                      Input category
                    </option>
                    <option value={1}>Food</option>
                    <option value={2}>Coffee</option>
                    <option value={3}>NonCofee</option>
                  </select>
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Input stock:</label>
                <span className={styles["stock-component"]}>
                  <select name="" id="" disabled>
                    <option
                      disabled
                      style={{ fontWeight: 800, fontSize: "14px" }}
                    >
                      Input stock
                    </option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </span>
              </span>
            </span>
            <span className={styles["right-side-compact-component"]}>
              <span className={styles.size}>
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
              <span className={styles["btn-product"]}>
                <button
                  className={styles["btn-product__save"]}
                  onClick={handleSaveProduct}
                >
                  Save Product
                </button>
                <button className={styles["btn-products__cancel"]}>
                  Cancel
                </button>
              </span>
            </span>
          </span>
        </section>
      </main>
    </>
  );
};

export default AddProduct;
