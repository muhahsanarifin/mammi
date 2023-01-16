import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
// import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
// import Loader from "../components/Loader";
import HeaderAdmin from "../components/admin/Header";
import ProductCard from "../components/ProductCard";
import TitleBar from "../components/TitleBar";
import PromoCard from "../components/PromoCard";
import { ProductCardSkeleton, PromoCardSkeleton } from "../components/Skeleton";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "../styles/Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loadProduct, setLoadProduct] = useState([]);
  const [loadPromo, setLoadPromo] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const navigation = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [filter, setFilter] = useState([]);
  // const [sort, setSort] = useState([]);
  const [seacrh, setSearch] = useState([]);
  const accessRole = localStorage.getItem("access-role");

  // TODO: Get Products
  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products?search=${seacrh}`
      );
      setLoadProduct(response.data.result.data);
      setTimeout(() => {
        setProducts(response.data.result.data);
      }, 1000);
    } catch (error) {
      setLoadProduct(loadProduct);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, [seacrh]);

  // TODO: Search Product
  const search = (e) => {
    const delayDebounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
    return () => clearTimeout(delayDebounce);
  };

  // TODO: Get Promos
  const getPromos = async () => {
    try {
      setLoadPromo(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos`
      );
      // console.log(response.data.result
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
        <HeaderAdmin onChange={search} />
      ) : (
        <Header onChange={search} />
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
          <PromoCard promos={promos} />
          <button className={styles["btn-coupon"]}>Apply Coupon</button>
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
          <ul className={styles["main__products__header"]}>
            <li className={styles["favor-products"]} value={``} onClick={``}>
              Favorite Product
            </li>
            <li
              className={styles["coffee-products"]}
              value={`Cofee`}
              onClick={``}
            >
              Coffee
            </li>
            <li
              className={styles["non-coffee-products"]}
              value={``}
              onClick={``}
            >
              Non Coffee
            </li>
            <li className={styles.foods} value={``} onClick={``}>
              Foods
            </li>
            <li className={styles["Add-on"]} value={``} onClick={``}>
              Add-on
            </li>
          </ul>
          <span className={styles["sorting-and-pagination"]}>
            <span className={styles.sorting}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className={styles["dropdown-products"]}>
                  <p>Sort</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    header
                    className={styles["dropdown-item-products"]}
                  >
                    Price
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Expensive
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Low
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    header
                  >
                    post
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Latest
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Oldest
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </span>
          <span
            className={`row gap-4 mx-5 ${styles["main__products__content"]}`}
          >
            {!products.length && <ProductCardSkeleton products={loadProduct} />}
            {/* TODO: Product card */}
            {products.map((product) => (
              <ProductCard
                productId={product.id}
                productImage={product.image}
                productName={product.product_name}
                prodcutPrice={product.price}
              />
            ))}
          </span>
          {accessRole === "Admin" ? (
            <Link
              to={`/product/add`}
              className={styles["link-btn-new-product"]}
            >
              <span className={styles["btn-new-product"]}>
                <button> Add new Product</button>
              </span>
            </Link>
          ) : (
            <span className={styles["sorting-and-pagination"]}>
              <span className={styles.pagination}>
                <Pagination>
                  <PaginationItem style={{ color: "red" }}>
                    <PaginationLink
                      first
                      href="#"
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      previous
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      next
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      last
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                </Pagination>
              </span>
            </span>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
