import React from "react";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import HeaderAdmin from "../components/admin/Header";

import Header from "../components/Header";

import Footer from "../components/Footer";

import styles from "../styles/Profile.module.css";

import pen from "../assets/icons/pen.svg";

import Axios from "axios";

const Profile = () => {
  // TODO: Init
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [details, setDetails] = useState([]);

  // TODO: Get token & role from localstorage »
  const token = localStorage.getItem("token");
  console.log(token);

  const role = localStorage.getItem("role");
  console.log(role);

  // TODO: Get Contact Profile»
  const getContact = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/contact/id`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setContacts(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  // « Get Detail Profile »
  const getDetail = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/detail/id`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setDetails(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  // « Handle Logout »
  const handleLogOut = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth/logout`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {details.map((detail) => (
        <>
          {role === "Admin" ? (
            <HeaderAdmin
              LinktoHome={`/`}
              LinktoProducts={`/products`}
              LinktoOrders={`/order`}
              LinktoDashboard={`/dashboard`}
              // value = {}
              // onChange = {}
              // onSubmit = {}
            />
          ) : (
            <Header
              LinktoHome="/"
              LinktoProducts="/products"
              LinktoYourcart="/order"
              LinktoHistory="/history"
              imgsrc={detail.picturew}
              alt={`${detail.display_name}`}
            />
          )}
          <main className={styles.main}>
            {role === "Admin" ? (
              <h3 className={styles.title}>Admin Profile</h3>
            ) : (
              <h3 className={styles.title}>User Profile</h3>
            )}
            {contacts.map((contact) => (
              <>
                <section
                  className={`d-flex flex-row gap-4 justify-content-center ${styles["identity-user"]}`}
                >
                  {role === "Admin" ? (
                    <span className={styles.profile}>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_HOST}${detail.picture}`}
                        alt="Profile"
                        className={styles["profile__image"]}
                      />
                      <span className={styles["btn-profile"]}>
                        <input type="file" />
                      </span>
                      <p className={styles["display-name"]}>
                        {detail.display_name}
                      </p>
                      <p className={styles.email}>{contact.email}</p>
                    </span>
                  ) : (
                    <span className={styles.profile}>
                      <img
                        src={detail.picture}
                        alt="Profile"
                        className={styles["profile__image"]}
                      />
                      <span className={styles["btn-profile"]}>
                        <input type="file" />
                      </span>
                      <p className={styles["display-name"]}>
                        {detail.display_name}
                      </p>
                      <p className={styles.email}>{contact.email}</p>
                      <p className={styles.status}>
                        Has been ordered 15 products
                      </p>
                    </span>
                  )}
                  <span className={styles.contacts}>
                    <span className={styles["header-contact"]}>
                      <h3>Contacts</h3>
                      <span className={styles["btn-contact"]}>
                        <img src={pen} alt="btn-contact" />
                      </span>
                    </span>
                    <form className={styles.forms}>
                      <span className={styles.email}>
                        <label htmlFor="emailAddress">Email address:</label>
                        <input
                          type="text"
                          id="emailAddress"
                          value={`${contact.email}`}
                          disabled
                        />
                      </span>
                      <span className={styles["mobile-number"]}>
                        <label htmlFor="mobileNumber">Mobile number:</label>
                        <input
                          type="text"
                          id="mobileNumber"
                          value={`${contact.phone_number}`}
                          disabled
                        />
                      </span>
                      <span className={styles["delivery"]}>
                        <label htmlFor="deliveryAddress">
                          Delivery address:
                        </label>
                        <input
                          type="text"
                          id="deliveryAddress"
                          value={`${detail.address}`}
                        />
                      </span>
                    </form>
                  </span>
                </section>
              </>
            ))}
            <section className={styles["identity-detail-user"]}>
              <section className={styles.details}>
                <span className={styles["header-detail"]}>
                  <h3>Details</h3>
                  <span className={styles["btn-detail"]}>
                    <img src={pen} alt="btn-detail" />
                  </span>
                </span>
                <span className={styles["details__left-side"]}>
                  <span className={styles["display-name"]}>
                    <label htmlFor="displayName">Display name:</label>
                    <input
                      type="text"
                      id="displayName"
                      value={`${detail.display_name}`}
                    />
                  </span>
                  <span className={styles["first-name"]}>
                    <label htmlFor="firstName">First name:</label>
                    <input
                      type="text"
                      id="firstName"
                      value={`${detail.first_name}`}
                    />
                  </span>
                  <span className={styles["last-name"]}>
                    <label htmlFor="lastName">Last name:</label>
                    <input
                      type="text"
                      id="lastName"
                      value={`${detail.last_name}`}
                    />
                  </span>
                </span>
                <span className={styles["details__right-side"]}>
                  <span className={styles.date}>
                    <label htmlFor="birth">DD/MM/YY</label>
                    <input type="text" id="birth" />
                  </span>
                  <span className={styles.gender}>
                    <span>
                      <input type="radio" id="male" />
                      <label htmlFor="male">Male</label>
                    </span>
                    <span>
                      <input type="radio" id="female" />
                      <label htmlFor="female">Female</label>
                    </span>
                  </span>
                </span>
              </section>
              <section className={styles.buttons}>
                <p>Do you want to save the change?</p>
                <button className={styles["btn-save"]}>Save Change</button>
                <button className={styles["btn-cancel"]}>Cancel</button>
                <button className={styles["btn-edit"]}>Edit Password</button>
                <button
                  onClick={handleLogOut}
                  className={styles["btn-log-out"]}
                >
                  Log Out
                </button>
              </section>
            </section>
          </main>
        </>
      ))}
      <Footer />
    </>
  );
};

export default Profile;
