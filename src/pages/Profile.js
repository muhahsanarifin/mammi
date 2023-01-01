import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

import pen from "../assets/icons/pen.svg";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [details, setDetails] = useState([]);
  const [disableInputContact, setDisableInputContact] = useState(true);
  const [disableInputDetail, setDisableInputDetail] = useState(true);
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [display_name, displayName] = useState("");
  const [gender, setgender] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState();
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");

  // TODO: Get Contact Profile
  const getContact = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/contact/id`,
        {
          headers: {
            "x-access-token": accessToken,
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

  // TODO: Get Detail Profile
  const getDetail = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/detail/id`,
        {
          headers: {
            "x-access-token": accessToken,
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

  // TODO: Handle Logout
  const handleLogOut = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/auth/logout`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputContact = () => {
    setDisableInputContact(!disableInputContact);
  };

  const handleInputDetail = () => {
    setDisableInputDetail(!disableInputDetail);
  };

  // TODO: Modal
  const handleModal = () => setModal(!modal);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* TODO: Modal */}
      <Modal
        toggle={handleModal}
        isOpen={modal}
        titleBtn={`Logout`}
        decs={`Are you sure want to logout ?`}
        onClick={handleLogOut}
      />
      {/* TODO: Header */}
      <Header />
      {/* TODO: Main */}
      <main className={styles.main}>
        <h3 className={styles.title}>User Profile</h3>
        {details.map((detail) => (
          <>
            {contacts.map((contact) => (
              <>
                <section
                  className={`d-flex flex-row gap-4 justify-content-center ${styles["identity-user"]}`}
                >
                  {accessRole === "Admin" ? (
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
                      <span
                        className={styles["btn-contact"]}
                        onClick={handleInputContact}
                      >
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
                          placeholder={`${detail.address}`}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          disabled={disableInputContact}
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
                  <span
                    className={styles["btn-detail"]}
                    onClick={handleInputDetail}
                  >
                    <img src={pen} alt="btn-detail" />
                  </span>
                </span>
                <span className={styles["details__left-side"]}>
                  <span className={styles["display-name"]}>
                    <label htmlFor="displayName">Display name:</label>
                    <input
                      type="text"
                      id="displayName"
                      placeholder={`${detail.display_name}`}
                      value={``}
                      disabled={disableInputDetail}
                    />
                  </span>
                  <span className={styles["first-name"]}>
                    <label htmlFor="firstName">First name:</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder={`${detail.first_name}`}
                      value={``}
                      disabled={disableInputDetail}
                    />
                  </span>
                  <span className={styles["last-name"]}>
                    <label htmlFor="lastName">Last name:</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder={`${detail.last_name}`}
                      value={``}
                      disabled={disableInputDetail}
                    />
                  </span>
                </span>
                <span className={styles["details__right-side"]}>
                  <span className={styles.date}>
                    <label htmlFor="birth">DD/MM/YY</label>
                    <input
                      type="text"
                      id="birth"
                      placeholder={`${detail.birth}`}
                      value={``}
                      disabled={disableInputDetail}
                    />
                  </span>
                  <span className={styles.gender}>
                    <span>
                      <input
                        type="radio"
                        id="male"
                        value={"Male"}
                        disabled={disableInputDetail}
                      />
                      <label htmlFor="male">Male</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="female"
                        value={"Female"}
                        disabled={disableInputDetail}
                      />
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
                <button onClick={handleModal} className={styles["btn-log-out"]}>
                  Log Out
                </button>
              </section>
            </section>
          </>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Profile;
