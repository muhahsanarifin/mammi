import React from "react";

import { Link } from "react-router-dom";

// import { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

import mammiLogo from "../assets/images/mammi-logo.png";

import searchIcon from "../assets/icons/search.svg";

import staffIcon from "../assets/icons/staff.svg";

import storesIcon from "../assets/icons/stores.svg";

import customersIcon from "../assets/icons/customers.svg";

import teamWorkImage from "../assets/images/team-work.png";

import hazzelnatLatteImage from "../assets/images/hazelnat-latte.svg";

import pingkyPromiseImage from "../assets/images/pinky-promise.svg";

import chickenWings from "../assets/images/chicken-wings.svg";

import hugeGlobal from "../assets/images/huge-global.svg";

import customer from "../assets/images/customer.svg";

import star from "../assets/icons/star.svg";

import dots from "../assets/icons/dots.svg";

import left from "../assets/icons/left.svg";

import right from "../assets/icons/right.svg";

import netflix from "../assets/images/netflix.svg";

import reddit from "../assets/images/reddit.svg";

import amazon from "../assets/images/amazon.svg";

import discord from "../assets/images/discord.svg";

import spotify from "../assets/images/spotify.svg";

const Home = () => {
  // « Init »
  // const [navbar, setNabvar] = useState("")
  // const navigate = useNavigate()

  // « Get token & role from localstorage »
  const token = localStorage.getItem("token");

  const role  = localStorage.getItem("role")

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__logo"]}>
          <span className={styles["header__logo__image"]}>
            <img src={mammiLogo} alt="mammi-logo" />
          </span>
          <span className={styles["header__logo__init"]}>
            <p>MAMMI</p>
          </span>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles["content-navbar"]}>
            <li>
              <Link to={"/"} className={styles["content-navbar-text"]}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/products"} className={styles["content-navbar-text"]}>
                Product
              </Link>
            </li>
            {role === "Admin" ? (
              <>
                <li>
                  <Link to={"/order"} className={styles["content-navbar-text"]}>
                    Order
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard"}
                    className={styles["content-navbar-text"]}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/order"} className={styles["content-navbar-text"]}>
                    YourCart
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/history"}
                    className={styles["content-navbar-text"]}
                  >
                    History
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {token ? (
          <div className={styles["sign-in-up"]} style={{ display: "none" }}>
            <span className={styles["sign-in"]}>
              <Link to={`/login`}>
                <button>Login</button>
              </Link>
            </span>
            <span className={styles["sign-up"]}>
              <Link to={`/sign-up`}>
                <button>Sign Up</button>
              </Link>
            </span>
          </div>
        ) : role === "Admin" ? (
          <div className={styles["sign-in-up"]}>
            <span className={styles["sign-in"]}>
              <Link to={`/login`}>
                <button>Login</button>
              </Link>
            </span>
            <span className={styles["sign-up"]}>
              <Link to={`/sign-up`}>
                <button>Sign Up</button>
              </Link>
            </span>
          </div>
        ) : (
          <div className={styles["sign-in-up"]}>
            <span className={styles["sign-in"]}>
              <Link to={`/login`}>
                <button>Login</button>
              </Link>
            </span>
            <span className={styles["sign-up"]}>
              <Link to={`/sign-up`}>
                <button>Sign Up</button>
              </Link>
            </span>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <section className={`${styles.section} ${styles.introduction}`}>
          <span className={styles["introduction__text"]}>
            <h1>Start Your Day With Coffee and Good Meals</h1>
            <p>
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </p>
          </span>
          <span className={styles["btn-start"]}>
            <Link to={`/sign-up`}>
              <button>Get Started</button>
            </Link>
          </span>
          <span className={styles.search}>
            <img src={searchIcon} alt="search" />
            <input type="text" placeholder="Search" />
          </span>
        </section>
        <section className={styles["informations-cards"]}>
          <span className={styles.staff}>
            <img src={staffIcon} alt="Staff" />
            <span>
              <p className={styles.qty}>90+</p>
              <p>Staff</p>
            </span>
          </span>
          <span className={styles.stores}>
            <img src={storesIcon} alt="Stores" />
            <span>
              <p className={styles.qty}>30+</p>
              <p>Stores</p>
            </span>
          </span>
          <span className={styles.customers}>
            <img src={customersIcon} alt="Customers" />
            <span>
              <p className={styles.qty}>880+</p>
              <p>Customers</p>
            </span>
          </span>
        </section>
        <section className={`${styles.section} ${styles.branding}`}>
          <span className={styles["branding__left-side"]}>
            <img src={teamWorkImage} alt="team-work" />
          </span>
          <span className={styles["branding__right-side"]}>
            <h3>We Provide Good Coffee and Healthy Meals</h3>
            <p>
              You can explore the menu that we provide with fun and have their
              own taste and make your day better.
            </p>
            <ul>
              <li>High quality beans</li>
              <li>Healthy meals, you can request the ingredients</li>
              <li>Chat with our staff to get better experience for ordering</li>
              <li>Free member card with a minimum purchase of IDR 200.000</li>
            </ul>
          </span>
        </section>
        <section className={`${styles.section} ${styles["favor-products"]}`}>
          <h3>He is People's Favorite</h3>
          <p>
            Let's choose and have abit taste of poeple's favorite/ It might be
            yours tool
          </p>
          <div className={styles["pricing-table"]}>
            <div className={styles["pricing-table__column"]}>
              <img src={hazzelnatLatteImage} alt="Hazelnut Latte" />
              <span className={styles.title}>
                <p>Hazelnut Latte</p>
              </span>
              <span className={styles.description}>
                <ul>
                  <li>HazelnuSyrup</li>
                  <li>Vanilla Whipped Cream</li>
                  <li>Ice / Hot</li>
                  <li>Sliced Banana on Top</li>
                </ul>
              </span>
              <span className={styles.price}>
                <p>IDR 25.000</p>
              </span>
              <span className={styles["btn-price"]}>
                <button>Order Now</button>
              </span>
            </div>
            <div className={styles["pricing-table__column"]}>
              <img src={pingkyPromiseImage} alt="Pingky Promise" />
              <span className={styles.title}>
                <p>Pingky Promise</p>
              </span>
              <span className={styles.description}>
                <ul>
                  <li>1 Shot of Coffee</li>
                  <li>Vanilla Whipped Cream</li>
                  <li>Chocolate Biscuits</li>
                  <li>Strawberry Syrup</li>
                  <li>Sliced strawberry on Top</li>
                </ul>
              </span>
              <span className={styles.price}>
                <p>IDR 30.000</p>
              </span>
              <span className={styles["btn-price"]}>
                <button>Order Now</button>
              </span>
            </div>
            <div className={styles["pricing-table__column"]}>
              <img src={chickenWings} alt="Chicken Wings" />
              <span className={styles.title}>
                <p>Chicken Wings</p>
              </span>
              <span className={styles.description}>
                <ul>
                  <li>Wings</li>
                  <li>Drum Sticks</li>
                  <li>Mayonaise and Lemon</li>
                  <li>Hot Fried</li>
                  <li>Secret Recipe</li>
                  <li>Buy 1 Get 1 only for Dine in</li>
                </ul>
              </span>
              <span className={styles.price}>
                <p>IDR 40.000</p>
              </span>
              <span className={styles["btn-price"]}>
                <button>Order Now</button>
              </span>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.visit}`}>
          <h3>Visit Our Store in The Spot on the Map Below</h3>
          <p>
            See our store in every city on the spot and spen your good day
            there. See you soon
          </p>
          <img src={hugeGlobal} alt="Map" />
        </section>
        <section className={`${styles.section} ${styles.partnerts}`}>
          <h3 className={styles["partnerts__title"]}>Our Partner</h3>
          <span className={styles["partnerts__images"]}>
            <img src={netflix} alt="Netfilx" />
            <img src={reddit} alt="Reddit" />
            <img src={amazon} alt="Amazon" />
            <img src={discord} alt="Discord" />
            <img src={spotify} alt="Spotify" />
          </span>
        </section>
        <section className={`${styles.section} ${styles.testimonials}`}>
          <h3 className={styles["testimonials__title"]}>
            Loved by Thousands of Happy Customer
          </h3>
          <p className={styles["testimonials__decs"]}>
            These are the stories od or customers who have visited us with great
            pleasure.
          </p>
          <span className={styles.testimonial}>
            <span className={styles["testimonial__customers"]}>
              <span className={styles["testimonial__customer"]}>
                <span className={styles["testimonial__customer__identity"]}>
                  <img
                    src={customer}
                    alt="Customer"
                    className={styles["testimonial__identity__avatar"]}
                  />
                  <span className={styles["testimonial__identity__profile"]}>
                    <h3 className={styles["profile__name"]}>Viezh Robert</h3>
                    <p className={styles["profile__location"]}>
                      Warsaw, poland
                    </p>
                  </span>
                  <span className={styles["testimonial__ratings"]}>
                    <p>4.5</p>
                    <img src={star} alt="star" />
                  </span>
                </span>
                <p className={styles["testimonials__comment"]}>
                  “Wow... I am very happy to spend my whole day here. the Wi-fi
                  is good, and the coffee and meals tho. I like it here!! Very
                  recommended!
                </p>
              </span>
              {/* <span className={styles["testimonial__customer"]}>
                  <span className={styles["testimonial__customer__identity"]}>
                    <img
                      src={customer}
                      alt="Customer"
                      className={styles["testimonial__identity__avatar"]}
                    />
                    <span className={styles["testimonial__identity__profile"]}>
                      <h3 className={styles["profile__name"]}>Viezh Robert</h3>
                      <p className={styles["profile__location"]}>
                        Warsaw, poland
                      </p>
                    </span>
                    <span className={styles["testimonial__ratings"]}>
                      <p>4.5</p>
                      <img src={star} alt="star" />
                    </span>
                  </span>
                  <p className={styles["testimonials__comment"]}>
                    “Wow... I am very happy to spend my whole day here. the
                    Wi-fi is good, and the coffee and meals tho. I like it
                    here!! Very recommended!
                  </p>
                </span> */}
            </span>
            <span className={styles["testimonial__components"]}>
              <span className={styles["testimonial__components__dots"]}>
                <img src={dots} alt="dots" />
              </span>
              <span className={styles["testimonial__components__btn"]}>
                <span className={styles["btn-left"]}>
                  <img src={left} alt="Left Button" />
                </span>
                <span className={styles["btn-right"]}>
                  <img src={right} alt="Right Button" />
                </span>
              </span>
            </span>
          </span>
        </section>
        <section className={styles["promo-cards"]}>
          <span>
            <h3>Check our promo Today</h3>
            <p>Let's see the deals and pick yours!</p>
          </span>
          <button className={styles["btn-see-promo"]}>See Promo</button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
