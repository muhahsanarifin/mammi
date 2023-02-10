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
  const [category_id, setCategory] = useState(0);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const accessToken = localStorage.getItem("access-token");

  const handleUploadeImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setImage(uploaded);
  };

  const handleSaveProduct = async () => {
    if (
      product_name.length === 0 ||
      price.length === 0 ||
      description.length === 0 ||
      stock.length === 0
    ) {
      return console.log("Please, fill in data completely!");
    }
    let formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("product_name", product_name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);

    let body = formData;

    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/create`,
        body,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      // console.log(response.data.result);
      if (response.status === 200) {
        console.log(response.data.result.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancelInput = () => {
    setProductName("");
    setPrevImage(null);
    setPrice("");
    setDescription("");
    setStock(0);
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
                  capture="camera"
                  name="picture"
                  accept="image/*"
                  className={styles.picture}
                  disabled
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className={styles.galery}
                  onChange={handleUploadeImage}
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
                  value={product_name}
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
                  value={price}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </span>
          </span>
          <span className={styles["compact-components-section"]}>
            <span className={styles["left-side-compact-component"]}>
              <span className={styles.category}>
                <label htmlFor="category_id">Input Category:</label>
                <span className={styles["category-component"]}>
                  <select
                    name="category_id"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option
                      style={{
                        fontWeight: 800,
                        fontSize: "14px",
                        display: "none",
                      }}
                    >
                      Choose category :
                    </option>
                    <option value={1}>Food</option>
                    <option value={2}>Coffee</option>
                    <option value={3}>Non Cofee</option>
                  </select>
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="stock">Input stock:</label>
                <span className={styles["stock-component"]}>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </span>
              </span>
            </span>
            <span className={styles["right-side-compact-component"]}>
              {/* <span className={styles.size}>
                <label htmlFor="#">Input product size:</label>
                <p>click methods you want to use for this product</p>
                <span className={styles["size_type"]} disabled>
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
                <ul className={styles["delivery-methods"]} disabled>
                  <li>Home Delivery</li>
                  <li>Dine in</li>
                  <li>Take away</li>
                </ul>
              </span> */}
              <span className={styles["btn-product"]}>
                <button
                  className={
                    !product_name ||
                    !prevImage ||
                    !price ||
                    !description ||
                    !category_id ||
                    !stock
                      ? styles["btn-product__save"]
                      : styles["btn-product__save-active"]
                  }
                  disabled={
                    !product_name ||
                    !prevImage ||
                    !price ||
                    !description ||
                    !category_id ||
                    !stock
                  }
                  onClick={handleSaveProduct}
                >
                  Save Product
                </button>
                <button
                  className={
                    !product_name &&
                    !prevImage &&
                    !price &&
                    !description &&
                    !category_id &&
                    !stock
                      ? styles["btn-products__cancel"]
                      : styles["btn-products__cancel-active"]
                  }
                  onClick={handleCancelInput}
                >
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
