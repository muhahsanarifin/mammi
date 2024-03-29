import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import productsAction from "../../redux/actions/products";

import HeaderAdmin from "../../components/admin/Header";
import { CameraOutlined } from "@ant-design/icons";
import styles from "../../styles/admin/EditProduct.module.css";
import { useState } from "react";
import Button from "../../components/Button";

const EditProduct = () => {
  const dispatch = useDispatch();
  const [prevImage, setPrevImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [product_name, setProductName] = useState("");
  const [category_id, setCategoryId] = useState(0);
  const [category_name, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [products, setProductDetail] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteTextSatus, setDeleteTextStatus] = useState("");
  const accessToken = localStorage.getItem("access-token");
  const { id } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setImageLoading(true);
        const response = await Axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/${id}`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );
        setProductDetail(response.data.result[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setImageLoading(false);
      }
    };
    getProductDetail();
  }, [accessToken, id]);

  // Default input values
  useEffect(() => {
    setProductName(products.product_name);
    setImage(products.image);
    setPrice(products.price);
    setCategoryId(products.category_id);
    setDescription(products.description);
    setStock(products.stock);
    setCategoryName(products.category_name);
  }, [
    products.product_name,
    products.image,
    products.price,
    products.category_id,
    products.description,
    products.stock,
    products.category_name,
  ]);

  const handleUploadeImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setImage(uploaded);
  };

  const handleSaveProduct = async () => {
    if (
      product_name?.length === 0 ||
      image?.length === 0 ||
      price?.length === 0 ||
      description?.length === 0
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
      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/edit/${id}`,
        body,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      // console.log(response.data.result);
      if (response.status === 200) {
        // console.log(response.data.result.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancleInput = () => {
    setProductName(products.product_name);
    setPrice(products.price);
    setCategoryId(products.category_id);
    setDescription(products.description);
    setStock(products.stock);
  };

  // Handle delete product
  const resFulfilled = (response) => {
    // console.log(response);
    setTimeout(() => {
      setDeleteTextStatus(response);
      setDeleteStatus(true);
    }, 4000);
  };

  const resError = (response) => {
    console.log(response); // <= Simple error response
  };

  const resFinnaly = () => {
    setDeleteStatus(false);
    setTimeout(() => {
      window.location.replace("/products");
    }, 5000);
  };

  const HandleDeleteProduct = () => {
    // console.log(id);
    dispatch(
      productsAction.deleteProductThunk(
        id,
        accessToken,
        resFulfilled,
        resError,
        resFinnaly
      )
    );
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

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
                Edit product
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles["main__contents"]}>
          <span className={styles["identity-product"]}>
            <span className={styles["identity-product-picture"]}>
              <span className={styles["product-image"]}>
                {imageLoading ? (
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
                    src={prevImage ? prevImage : products.image}
                    alt="products"
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
                  name="name"
                  id="name"
                  // placeholder="Type product name min. 50 characters"
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
                  // placeholder="Type the price"
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
                  // placeholder="Describe your product min. 150 characters"
                  value={description ?? ""}
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
                    name="category_id"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option style={{ fontWeight: 800, fontSize: "14px" }}>
                      Chosee category
                    </option>
                    <option
                      value={category_name}
                      style={{
                        color: "#ffba33",
                        fontWeight: "800",
                        fontSize: "12px",
                      }}
                      disabled
                    >
                      {category_name} (Recent category)
                    </option>
                    <option value={category_id === 1 ? category_id : 1}>
                      Food
                    </option>
                    <option value={category_id === 2 ? category_id : 2}>
                      Coffee
                    </option>
                    <option value={category_id === 3 ? category_id : 3}>
                      NonCofee
                    </option>
                  </select>
                </span>
              </span>
              <span className={styles.stock}>
                <label htmlFor="#">Input stock:</label>
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
              {!deleteStatus ? (
                <Button
                  buttonName={"Delete Product"}
                  titleButton={"Delete"}
                  OnDelete={HandleDeleteProduct}
                />
              ) : (
                <Button
                  status={deleteStatus ? deleteTextSatus : null}
                  displayButton={"none"}
                />
              )}
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
                    !price ||
                    !description ||
                    !category_id ||
                    !stock
                      ? styles["btn-product__save"]
                      : styles["btn-product__save-active"]
                  }
                  disabled={
                    !product_name ||
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
                    !product_name ||
                    !price ||
                    !description ||
                    !category_id ||
                    !stock
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

export default EditProduct;
