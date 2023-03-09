import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { getProduct } from "../utils/api/products";
import { useDispatch, useSelector } from "react-redux";
import cart from "../redux/actions/cart";

import HeaderAdmin from "../components/admin/Header";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/ProductDetail.module.css";
import arrowBrown from "../assets/icons/arrow-brown.svg";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.cart.addToCart);
  const orderSummaryOfAddToCart = useSelector(
    (state) => state.cart.orderSummaryOfAddToCart
  );
  const [products, setProductDetail] = useState([]);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [counter, setCounter] = useState(1);
  const [deliveries, setDeliveries] = useState([]);
  const [promos, setPromos] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [product_name, seProductName] = useState("");
  const [qtySizes, setQtySizes] = useState(null);
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [taxes, setTaxes] = useState(0);
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");

  // Part of sub total
  const [charge_cost, setChargeCost] = useState(0);
  const [discount, setDiscount] = useState(0); // <== Dicount From Promos
  const [shipping, setShipping] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  // const [qtyPR, setqtyPR] = useState(0);
  const [sizeFee, setSizeFee] = useState(0);
  const [sizeName, setSizeName] = useState("");

  // Part of form value
  const [product_id, setProductId] = useState("");
  const [deliveryId, setDeliveryId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [promoId, setPromoId] = useState(null);

  // Delivery
  // console.log("Shipping: ", shipping); // <= Shipping
  // console.log("Counter: ", counter);
  // console.log("Charge cost: ", charge_cost); // <= Charge Cost
  // console.log(charge_cost + shipping);
  // console.log(counter * price);

  // Size
  // console.log("Size fee", sizeFee);

  // Notes
  // console.log(notes);

  // Discount
  // console.log("Discount: ", discount);

  // const resultDiscItem = price - price * (discount / 100);
  // console.log("Result Discount per item:", resultDiscItem);

  // Quantity price product
  // const qtyPriceResult = price * counter;
  // console.log(qtyPriceResult);
  // console.log("Tax: ", taxes);

  // Total & Sub Total
  useEffect(() => {
    const resultDiscItem = price - price * (discount / 100);
    setSubtotal((sizeFee + resultDiscItem) * counter);
    setTotal(
      (sizeFee + resultDiscItem) * counter + taxes + shipping + charge_cost
    );
  }, [price, counter, sizeFee, discount, taxes, shipping, charge_cost]);

  // console.log("Sub Total: ", subTotal);
  // console.log("Total: ", total);

  // Get Product Detail
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoader(true);
        const response = await getProduct(id, accessToken);

        setProductDetail(response.data.result);
        setProductId(response.data.result[0].id);
        setPrice(response.data.result[0].price);
        seProductName(response.data.result[0].product_name);
        setImage(response.data.result[0].image);
        // console.log(response.data.result);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoader(false);
      }
    };
    getProductDetail();
  }, [accessToken, id]);

  // Get Delivery
  useEffect(() => {
    const getDelivery = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}api/v1/deliveries`
        );
        // console.log(response.data);
        setDeliveries(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    getDelivery();
  }, []);

  // Get Sizes
  useEffect(() => {
    const getSizes = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}api/v1/sizes`
        );
        // console.log(response.data);
        setSizes(response.data.result);
        // console.log(sizes);
      } catch (error) {
        console.log(error);
      }
    };
    getSizes();
  }, []);

  const handleDelivery = (e) => {
    let valueDelivery = e.target.value.split(" ");
    // console.log(valueDelivery);
    setShipping(parseFloat(valueDelivery[1]));
    setChargeCost(parseFloat(valueDelivery[2]));
    setDeliveryId(valueDelivery[0]);
  };

  const handleSize = (e) => {
    // console.log(e.target.value.split(" "));
    setSizeId(e.target.value.split(" ")[0]);
    setSizeFee(parseFloat(e.target.value.split(" ")[1]));
    setSizeName(e.target.value.split(" ")[2]);
  };

  // Get Promo
  useEffect(() => {
    const getPromos = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos`
        );
        // console.log(response.data.result.data);
        setPromos(response.data.result.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPromos();
  }, []);

  const handleDiscount = (e) => {
    // console.log(e.target.value.split(" "));
    setDiscount(parseFloat(e.target.value.split(" ")[0]));
    setPromoId(e.target.value.split(" ")[1]);
  };

  useEffect(() => {
    const qtySize = `x${counter} ${sizeName}`;
    // Research
    // let resultqtySize = [...qtySizes, qtySize];
    // console.log("Result qty size:" ,resultqtySize);
    setQtySizes(qtySize);
  }, [counter, sizeName]);
  // console.log("Quantity size:", qtySizes);

  // Handle Checkout
  const handleCheckout = () => {
    if (deliveryId.length < 1) return console.log("Please, choose delivery!");

    if (sizeId.length < 1) return console.log("Please, choose size!");

    const bodyCheckout = {
      product_id: product_id.toString(),
      promo_id: promoId,
      size_id: sizeId,
      delivery_id: deliveryId,
      price: price,
      tax: taxes,
      qty: counter,
      subtotal: subTotal,
      total: total,
      notes: notes,
    };

    dispatch(cart.checkoutProductThunk(bodyCheckout));

    const bodySummuryOfCheckout = {
      product_name: product_name,
      qty: counter,
      image: image,
      price: price,
      tax: taxes,
      shipping: shipping,
      charge_cost: charge_cost,
      subtotal: subTotal,
      total: total,
    };

    dispatch(cart.orderSummaryThunkOfCheckout(bodySummuryOfCheckout));

    setTimeout(() => {
      console.log("Checkout successfully!");
    }, 2500);

    window.location.replace("/order");
  };
  // console.log(bodyCheckout);
  // console.log(bodyOforderSummary);

  // Handle Add to Chart
  const handleToCart = () => {
    // if (deliveryId.length < 1) return console.log("Please, choose delivery!");

    if (sizeId.length < 1) return console.log("Please, choose size!");

    const filterDuplicateProduct = addToCart.filter(
      (e) => e.product_id === product_id
    );

    // console.log("Filter duplicate: ", filterDuplicateProduct);

    if (filterDuplicateProduct.length > 0)
      return setTimeout(() => {
        // console.log("Product have been added to cart!");
      }, 1500);

    const filterDuplicateDelivery = addToCart.find(
      (e) => e.deliveryId === deliveryId
    );
    // console.log("Filter duplicate delivery: ", filterDuplicateDelivery);

    if (filterDuplicateDelivery) {
      console.log("Delivery Method has been chosen!");
      return;
    }

    const bodyAddToCart = {
      product_id: product_id.toString(),
      promo_id: promoId,
      size_id: sizeId,
      price: price,
      tax: taxes,
      qty: counter,
      deliveryId: deliveryId === "" ? addToCart[0].deliveryId : deliveryId,
      shipping: shipping === 0 ? addToCart[0].shipping : shipping,
      charge_cost: charge_cost === 0 ? addToCart[0].charge_cost : charge_cost,
      subtotal: subTotal,
      total: null,
      notes: notes,
    };
    const multipleBodyAddToCart = [...addToCart, bodyAddToCart];
    dispatch(cart.addCartThunk(multipleBodyAddToCart));

    // console.log("Multiple Body AddToCart: ", multipleBodyAddToCart);

    const bodyOrderSummaryOfAddToCart = {
      prodcut_name: product_name,
      qty: counter,
      image: image,
      price: price,
      tax: taxes,
      shipping: shipping === 0 ? addToCart[0].shipping : shipping,
      charge_cost: charge_cost === 0 ? addToCart[0].charge_cost : charge_cost,
      subtotal: subTotal,
      total: null,
    };
    const multipleBodyOfSummaryAddToCart = [
      ...orderSummaryOfAddToCart,
      bodyOrderSummaryOfAddToCart,
    ];
    dispatch(cart.orderSummaryAddToCartThunk(multipleBodyOfSummaryAddToCart));

    // console.log(
    //   "Multiple body of summary AddToCart: ",
    //   multipleBodyOfSummaryAddToCart
    // );

    setTimeout(() => {
      console.log("Add to cart successfully.");
    }, 2500);
  };

  // console.log("Product ID: ", typeof product_id.toString());
  return (
    <>
      {accessRole === "Admin" ? <HeaderAdmin /> : <Header />}
      <main className={styles.main}>
        <>
          <section className={styles.breadcrumb}>
            <nav className={styles["breadcrumb-nav"]}>
              <ul className={styles["breadcrumb-list"]}>
                <li className={styles["breadcrumb-item"]}>
                  <Link to={`/products`}>Favorite & Promo</Link>
                </li>
                {loader && (
                  <li
                    className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-divider"]}`}
                  >
                    Loading...
                  </li>
                )}
                {products.map((product) => (
                  <li
                    className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-divider"]}`}
                  >
                    {product.product_name}
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <section
            className={`${styles["first-main"]} ${styles["identity-product"]}`}
          >
            <span className={styles["identity-product_image"]}>
              {loader && <div></div>}
              {products.map((product) => (
                <img src={product.image} alt={product.product_name} />
              ))}
            </span>
            <span className={styles["identity-product__description"]}>
              {loader && (
                <h3 className={styles["identity-product__description__title"]}>
                  Loading...
                </h3>
              )}
              {products.map((product) => (
                <h3 className={styles["identity-product__description__title"]}>
                  {product.product_name}
                </h3>
              ))}

              {loader && (
                <article
                  className={styles["identity-product__description__article"]}
                >
                  Loading...
                </article>
              )}
              {products.map((product) => (
                <article
                  className={styles["identity-product__description__article"]}
                >
                  {product.description}
                </article>
              ))}
              {accessRole === "Admin" ? null : (
                <p
                  className={styles["identity-product__description__delivery"]}
                >
                  Delivery only on Monday to Friday at 1-7pm
                </p>
              )}
            </span>
          </section>
        </>
        <section className={styles["second-main"]}>
          <span className={styles["delivery-and-time"]}>
            <p className={styles["delivery-and-time__title"]}>
              Delivery and Notes
            </p>
            <span className={styles["delivery-types"]}>
              <span className={styles["section-method"]}>
                {deliveries.map((delivery) => (
                  <button
                    value={`${delivery.id} ${delivery.shipping} ${delivery.charge_cost}`}
                    onClick={handleDelivery}
                    // disabled={disablebtnDelivery}
                  >
                    {delivery.method}
                  </button>
                ))}
              </span>
            </span>
            {/* <span className={styles["delivery-time"]}>
              <p>Now</p>
              <ul>
                <li>Yes</li>
                <li>No</li>
              </ul>
            </span> */}
            {/* <span className={styles["delivery-set-time"]}>
              <label>Set time</label>
              <input type="text" placeholder="Input note for reservation" />
            </span> */}
            <span className={styles["delivery-set-time"]}>
              <label>Notes</label>
              <input
                type="text"
                placeholder="Create note for reservation"
                onChange={(e) => setNotes(e.target.value)}
              />
            </span>
          </span>
          <span className={styles["confirm-product"]}>
            {/* Promo => discount */}
            <span className={styles["discount"]}>
              <select
                className={styles["discount-element"]}
                onChange={handleDiscount}
              >
                <option
                  style={{ fontWeight: 800, fontSize: "12px" }}
                  value={discount}
                >
                  Choose Promo
                </option>
                {promos.map((discount) => (
                  <>
                    {product_id === discount.product_id ? (
                      <option
                        value={
                          product_id === discount.product_id
                            ? `${discount.discount} ${discount.id}`
                            : 0
                        }
                        style={{ fontSize: "12px" }}
                      >
                        {product_id === discount.product_id && discount.code}
                      </option>
                    ) : null}
                  </>
                ))}
              </select>
            </span>
            <span className={styles["confirm-product__qty"]}>
              <span className={styles["confirm-product__qty__count"]}>
                <span
                  className={styles["confirm-product__qty__count__minus"]}
                  onClick={
                    counter <= 1
                      ? () => setCounter(counter)
                      : () => setCounter(counter - 1)
                  }
                >
                  -
                </span>
                <span
                  className={styles["confirm-product__qty__count__numeric"]}
                >
                  {counter}
                </span>
                <span
                  className={styles["confirm-product__qty__count__plus"]}
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </span>
              </span>
              <span className={styles["confirm-product__price"]}>
                <p className={styles["sub-total-price"]}>
                  IDR.{price === subTotal ? price : subTotal}
                </p>
                <div className={styles["info-price"]}>
                  <p className={styles["size-fee"]}>
                    {sizeFee === 0
                      ? null
                      : `Size fee IDR.${sizeFee} of one item`}
                  </p>
                  <p className={styles["discount-price"]}>
                    {discount === 0
                      ? null
                      : `Discount ${discount}% of one item`}
                  </p>
                </div>
              </span>
            </span>
            <span className={styles["confirm-product-btn"]}>
              {accessRole === "Admin" ? (
                <>
                  <button
                    className={styles["confirm-product-btn__add"]}
                    onClick={() => navigation("/order")}
                  >
                    Go To Orders
                  </button>
                  <Link
                    to={`/product/${id}/edit`}
                    className={styles["edit-product-btn__ask-link"]}
                  >
                    <button className={styles["edit-product-btn__ask"]}>
                      Edit Product
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className={styles["confirm-product-btn__add"]}
                    onClick={handleToCart}
                  >
                    Add to Cart
                  </button>
                  <button className={styles["confirm-product-btn__ask"]}>
                    Ask a staff
                  </button>
                </>
              )}
            </span>
          </span>
        </section>
      </main>
      <section className={styles["size-and-checkout"]}>
        <span className={styles["size_type"]}>
          <p>Choose a size</p>
          <div className={styles["size-sections"]}>
            {sizes.map((size) => (
              <button
                value={`${size.id} ${size.cost} ${size.name}`}
                onClick={handleSize}
              >
                {size.size}
              </button>
            ))}
          </div>
        </span>
        <span className={styles["checkout"]}>
          {loader && <div></div>}
          {products.map((product) => (
            <span className={styles["checkout__image"]}>
              <img src={product.image} alt={product.product_name} />
            </span>
          ))}
          <span className={styles["checkout__identify"]}>
            {loader && (
              <p className={styles["checkout__identify__title"]}>Loading...</p>
            )}
            {products.map((product) => (
              <p className={styles["checkout__identify__title"]}>
                {product.product_name}
              </p>
            ))}
            <ul className={styles["checkout__identify__size"]}>
              {/* {qtySizes.length >= 1
                ? qtySizes.map((e) => (
                    <li>
                      <p>{e}</p>
                    </li>
                  ))
                : null} */}
              <li>
                <p>{qtySizes}</p>
              </li>
            </ul>
          </span>
          {accessRole === "Admin" ? (
            <span className={styles["checkout-btn"]}>
              <p className={styles["review-detail"]}>Review Detail</p>
            </span>
          ) : (
            <span className={styles["checkout-btn"]} onClick={handleCheckout}>
              <p>Checkout</p>
              <span className={styles["checkout-btn-icon"]}>
                <img src={arrowBrown} alt="Checkout Button" />
              </span>
            </span>
          )}
        </span>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
