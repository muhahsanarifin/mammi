import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api/products";
import { getPromos } from "../utils/api/promos";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import HeaderAdmin from "../components/admin/Header";
import ProductCard from "../components/ProductCard";
import TitleBar from "../components/TitleBar";
import PromoCard from "../components/PromoCard";
import { PromoCardSkeleton } from "../components/Skeleton";
import Paginations from "../components/Pagination";
import Sorter from "../components/Sorter";
import Filter from "../components/Filter";

import styles from "../styles/Products.module.css";

const Products = () => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);
  const [post, setPost] = useState(searchParams.get("post") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [handleErrorMsg, handleSetErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const accessRole = localStorage.getItem("access-role");
  const [intDataOfPagination, setIntDataOfPagination] = useState([]);
  // const [totalPages, setTotalPages] = useState("");
  const [promos, setPromos] = useState([]);
  const [loadProduct, setLoadProduct] = useState(false);
  const [loadPromo, setLoadPromo] = useState(false);

  useEffect(() => {
    setSearchParams({
      post: post,
      price: price,
      category: category,
      search: search,
    });
  }, [setSearchParams, post, price, category, search]);

  // useEffect(() => {
  //   const currentParams = Object.fromEntries([...searchParams]);
  //   console.log("Current params: ", currentParams);
  // }, [searchParams]);

  const handleResfreshProduct = () => {
    setSearchParams({
      post: "",
      price: "",
      category: "",
      search: "",
    });

    // // Reset to be normal state similar to default state.
    // setPost("");
    // setPrice("");
    // setCategory("");
    // setSearch("");
    window.location.reload();
  };

  // TODO: Get Products
  useEffect(() => {
    const allProducts = async () => {
      try {
        setLoadProduct(true);
        const response = await getProducts(
          `${searchParams}&page=${page}&limit=${limit}`
        );
        setProducts(response.data.result.data);

        setIntDataOfPagination(response.data.result);
      } catch (error) {
        setErrorMsg(error.response.data.result.msg);
        handleSetErrorMsg(true);
      } finally {
        setLoadProduct(false);
      }
    };

    allProducts();
  }, [searchParams, page, limit]);

  // Search Product
  //  Implementation debounce without package.
  // const handleSearch = (e) => {
  //   const delayDebounce = setTimeout(() => {
  //     setSearch(e.target.value);
  //   }, 1000);

  //   return () => clearTimeout(delayDebounce);
  // };

  // Implementation debounce using useDebouncedCallback from use-debounce
  const debouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  // Get Promos
  useEffect(() => {
    const promos = async () => {
      try {
        setLoadPromo(true);
        const response = await getPromos();
        setPromos(response.data.result.data);
      } catch (error) {
        setLoadPromo(true);
        console.log(error.message);
      } finally {
        setLoadPromo(false);
      }
    };
    promos();
  }, []);

  return (
    <>
      <TitleBar title={`MAMMI | Products`} />
      {accessRole === "Admin" ? (
        <HeaderAdmin onChange={(e) => debouncedSearch(e.target.value)} />
      ) : (
        <Header onChange={(e) => debouncedSearch(e.target.value)} />
      )}
      <main className={styles.main}>
        <aside
          className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
        >
          <h3 className={styles["promo__title"]}>Promo for you</h3>
          <p className={styles["promo__announcement"]}>
            Coupon will updated every weeks. Check them out
          </p>

          {/* Promo card */}
          {loadPromo ? (
            <PromoCardSkeleton />
          ) : (
            <PromoCard promos={promos} onProductId={setProductId} />
          )}

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
            <Link to={`/promo/create`}>
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
              onClick={handleResfreshProduct}
              className={
                styles[
                  !category && !search && !price && !post
                    ? "refresh-product-btn-disable"
                    : "refresh-product-btn"
                ]
              }
            >
              Reset
            </button>

            {/* Sorter */}
            <Sorter onPrice={setPrice} onPost={setPost} />
          </span>
          <span
            className={`row gap-4 mx-5 ${styles["main__products__content"]}`}
          >
            {/* Product card */}
            {loadProduct ? (
              <>{errorMsg ? null : <Loader />}</>
            ) : (
              // <ProductCardSkeleton products={copyData}/>
              <>{!handleErrorMsg && <ProductCard products={products} />}</>
            )}

            {handleErrorMsg ? (
              <span className={styles["error-section"]}>
                <p className={styles["error-msg"]}>{errorMsg}</p>
                <button
                  onClick={handleResfreshProduct}
                  className={styles["error-msg-btn"]}
                >
                  Reset
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
                to={`/product/create`}
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
