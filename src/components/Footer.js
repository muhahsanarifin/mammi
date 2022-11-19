import React from 'react'

import mammiLogo from "../assets/images/mammi-logo.png";

import styles from "../styles/Footer.module.css"

import facebookIcon from "../assets/icons/facebook.svg";

import twitterIcon from "../assets/icons/twitter.svg";

import instagramIcon from "../assets/icons/instagram.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles["footer__left-side"]}>
        <span className={styles["footer__left-side__init"]}>
          <span className={styles["footer__left-side__init__logo"]}>
            <span className={styles["footer__left-side__init__logo__image"]}>
              <img src={mammiLogo} alt="mammi-logo" />
            </span>
            <span className={styles["footer__left-side__init__logo_init"]}>
              <p>MAMMI</p>
            </span>
          </span>
          <span className={styles.descriptions}>
            <p>
              Mammi is a store that sells some good meals, and especially
              coffee. We Provide high quality beans.
            </p>
          </span>
        </span>
        <span className={styles["footer__left-side__medias"]}>
          <a href="#">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="#">
            <img src={instagramIcon} alt="Twitter" />
          </a>
          <a href="#">
            <img src={twitterIcon} alt="Instagram" />
          </a>
        </span>
      </section>
      <section className={styles["footer__rigth-side"]}>
        <span className={styles["footer__rigth-side__products"]}>
          <p>Product</p>
          <ul>
            <li>Download</li>
            <li>Pricing</li>
            <li>Locations</li>
            <li>Countries</li>
            <li>Blog</li>
          </ul>
        </span>
        <span className={styles["footer__rigth-side__products__engage"]}>
          <p>Engage</p>
          <ul>
            <li>Coffee Shop ?</li>
            <li>FAQ</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Services</li>
          </ul>
        </span>
      </section>
      <section className={styles.copyright}>
        <p>©2022MAMMI</p>
      </section>
    </footer>
  );
}

export default Footer;
