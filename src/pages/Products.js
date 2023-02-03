import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
// import Loader from "../components/Loader";
import HeaderAdmin from "../components/admin/Header";
import ProductCard from "../components/ProductCard";
import TitleBar from "../components/TitleBar";
import PromoCard from "../components/PromoCard";
import { ProductCardSkeleton, PromoCardSkeleton } from "../components/Skeleton";
import Paginations from "../components/Pagination";
import Sorter from "../components/Sorter";
import Filter from "../components/Filter";

import styles from "../styles/Products.module.css";

const Products = () => {
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loadProduct, setLoadProduct] = useState([]);
  const [loadPromo, setLoadPromo] = useState(false);
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [price, setPrice] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [handleErrorMsg, handleSetErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const accessRole = localStorage.getItem("access-role");
  const [intDataOfPagination, setIntDataOfPagination] = useState([]);
  // const [totalPages, setTotalPages] = useState("");

  // TODO: Get Products
  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products?post=${post}&price=${price}&category=${category}&search=${search}&page=${page}&limit=${limit}`
      );
      setLoadProduct(response.data.result.data);
      setTimeout(() => {
        setProducts(response.data.result.data);
        // console.log("Products: ", response.data.result.data);
        setIntDataOfPagination(response.data.result);
        // setTotalPages(response.data.result.totalPages);
      }, 1000);
    } catch (error) {
      setLoadProduct(loadProduct);
      // console.log(error);
      setErrorMsg(error.response.data.result.msg);
      handleSetErrorMsg(true);
    }
  };
  useEffect(() => {
    getProducts();
    // setLimit(5);
    // setPost("oldest");
    // setPage(2);
  }, [search, post, price, category, limit, page]);

  // TODO: Search Product
  const handleSearch = (e) => {
    const delayDebounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 250);
    return () => clearTimeout(delayDebounce);
  };

  // console.log("sample data: ", intDataOfPagination)
  //  console.log("products: ", products);

  // console.log(search);
  // console.log(products);
  // console.log(typeof limit);
  // console.log(typeof post);
  // console.log(page);

  // || Research
  // console.log(typeof totalPage.next);

  // TODO: Get Promos
  const getPromos = async () => {
    try {
      setLoadPromo(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos`
      );
      setTimeout(() => {
        setPromos(response.data.result.data);
      }, 1000);
    } catch (error) {
      setLoadPromo(true);
      console.log(error.message);
    } finally {
      setLoadPromo(false);
    }
  };
  useEffect(() => {
    getPromos();
  }, []);

  return (
    <>
      <TitleBar title={`MAMMI | Products`} />
      {accessRole === "Admin" ? (
        <HeaderAdmin onChange={handleSearch} />
      ) : (
        <Header onChange={handleSearch} />
      )}
      <main className={styles.main}>
        <aside
          className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
        >
          <h3 className={styles["promo__title"]}>Promo for you</h3>
          <p className={styles["promo__announcement"]}>
            Coupon will updated every weeks. Check them out
          </p>
          {loadPromo && <PromoCardSkeleton />}
          {/* TODO: Promo card */}
          <PromoCard promos={promos} onProductId={setProductId} />

          <button
            className={
              !productId ? styles["btn-coupon"] : styles["btn-coupon-active"]
            }
            onClick={() => navigation(`/product/${productId?.split(" ")[0]}`)}
            disabled={!productId}
          >
            {!productId ? (
              <span>Tap promo card</span>
            ) : (
              <span>{`Apply ${productId?.split(" ")[1]}`}</span>
            )}
          </button>
          <span className={styles["terms-and-condition"]}>
            <h3>Terms and Condition</h3>
            <p>1. You can only apply 1 coupon per day</p>
            <p>2. It only for dine in</p>
            <p>3. Buy 1 get 1only for new user</p>
            <p>4. Should make member card to apply coupon</p>
          </span>

          {accessRole === "Admin" ? (
            <Link to={`/promo/add`}>
              <button className={styles["btn-add-promo"]}>Add new promo</button>
            </Link>
          ) : null}
        </aside>
        <section
          className={`${styles["main__right-side"]} ${styles["main__products"]}`}
        >
          {/* Filter */}
          <Filter onCategory={setCategory} />
          <span className={styles["sorting-and-pagination"]}>
            <button
              onClick={() => window.location.reload()}
              className={styles["refresh-product-btn"]}
            >
              refresh
            </button>
            <Sorter onPrice={setPrice} onPost={setPost} />
          </span>
          <span
            className={`row gap-4 mx-5 ${styles["main__products__content"]}`}
          >
            {!products.length && <ProductCardSkeleton products={loadProduct} />}
            {/* Product card */}
            {!handleErrorMsg &&
              products.map((product, idx) => (
                <ProductCard
                  productIdx={idx}
                  productId={product.id}
                  productImage={product.image}
                  productName={product.product_name}
                  prodcutPrice={product.price}
                />
              ))}
            {handleErrorMsg ? (
              <span className={styles["error-section"]}>
                <p className={styles["error-msg"]}>{errorMsg}</p>
                <button
                  onClick={() => window.location.reload()}
                  className={styles["error-msg-btn"]}
                >
                  refresh
                </button>
              </span>
            ) : null}
          </span>
          {accessRole === "Admin" ? (
            <>
              {!handleErrorMsg && (
                <Paginations
                  // limitPage={limit}
                  // currentPage={page}
                  // setcurrentPage={setPage}
                  // totalPages={totalPages}
                  setDataProductsOfPagination={setProducts}
                  initData={intDataOfPagination}
                />
              )}
              <Link
                to={`/product/add`}
                className={styles["link-btn-new-product"]}
              >
                <span className={styles["btn-new-product"]}>
                  <button> Add new Product</button>
                </span>
              </Link>
            </>
          ) : (
            !handleErrorMsg && (
              <Paginations
                // limitPage={limit}
                // currentPage={page}
                // setcurrentPage={setPage}
                // totalPages={totalPages}
                setDataProductsOfPagination={setProducts}
                initData={intDataOfPagination}
              />
            )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
