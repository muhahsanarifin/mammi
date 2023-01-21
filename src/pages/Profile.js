import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import TitleBar from "../components/TitleBar";

import pen from "../assets/icons/pen.svg";
import styles from "../styles/Profile.module.css";
import PrivateRoute from "../utils/PrivateRoute";

const Profile = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  const [detail, setDetail] = useState([]);
  const [disableInputContact, setDisableInputContact] = useState(true);
  const [disableInputDetail, setDisableInputDetail] = useState(true);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [previewImage, setPrevImage] = useState(null);
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");
  // TODO: Private route
  PrivateRoute(!accessToken, -1);

  // TODO: Get Contact Profile
  const getContact = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/contact/id`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setContact(response.data.result[0]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Get Detail Profile
  const getDetail = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/detail/id`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      setDetail(response.data.result[0]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
    getDetail();

    //TODO: Default Contacts input values
    setAddress(detail.address);

    //TODO: Default Details input values
    setDisplayName(detail.display_name);
    setFirstName(detail.first_name);
    setLastName(detail.last_name);
    setGender(detail.gender);
    setBirth(detail.birth);
    setPicture(detail.picture);
  }, [
    detail.address,
    detail.display_name,
    detail.first_name,
    detail.last_name,
    detail.gender,
    detail.birth,
    detail.picture,
  ]);

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

  // TODO: Handle Upload Image
  const handleUploadImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setPicture(uploaded);
  };

  // TODO: Handle Save Form
  const handleSaveForm = async () => {
    let formData = new FormData();
    formData.append("address", address);
    formData.append("display_name", display_name);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("birth", birth);
    formData.append("gender", gender);
    formData.append("picture", picture);

    let body = formData;

    try {
      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/users/acc/profile/edit`,
        body,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        localStorage.removeItem("access-picture");
        localStorage.setItem("access-picture", response.data.result[0].picture);
        // console.log(response.data.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancelForm = () => {
    setAddress(detail.address);
    setDisplayName(detail.display_name);
    setFirstName(detail.first_name);
    setLastName(detail.last_name);
    setGender(detail.gender);
    setBirth(detail.birth);
  };

  // TODO: Handle Modal
  const handleModal = () => setModal(!modal);

  return (
    <>
      <TitleBar title={`MAMMI | Profile`} />
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
        <section
          className={`d-flex flex-row gap-4 justify-content-center ${styles["identity-user"]}`}
        >
          {accessRole === "Admin" ? (
            <span className={styles.profile}>
              <img
                src={detail.picture}
                alt="Profile"
                className={styles["profile__image"]}
              />
              <span className={styles["btn-profile"]}>
                <input type="file" />
              </span>
              <p className={styles["display-name"]}>{detail.display_name}</p>
              <p className={styles.email}>{contact.email}</p>
            </span>
          ) : (
            <span className={styles.profile}>
              {loading && (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    width: "117px",
                    height: "117px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginBottom: "0" }}>Loading...</p>
                </span>
              )}
              <img
                src={previewImage ? previewImage : detail.picture}
                alt="Profile"
                className={styles["profile__image"]}
              />
              <span className={styles["btn-profile"]}>
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </span>
              {loading && (
                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                  Loading...
                </span>
              )}
              <p className={styles["display-name"]}>{detail.display_name}</p>
              {loading && (
                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                  Loading...
                </span>
              )}
              <p className={styles.email}>{contact.email}</p>
              <p className={styles.status}>Has been ordered 15 products</p>
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
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  type="text"
                  id="emailAddress"
                  value={contact.email}
                  disabled
                />
              </span>
              <span className={styles["mobile-number"]}>
                <label htmlFor="mobileNumber">Mobile number:</label>
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  type="text"
                  id="mobileNumber"
                  value={contact.phone_number}
                  disabled
                />
              </span>
              <span className={styles["delivery"]}>
                <label htmlFor="deliveryAddress">Delivery address:</label>
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  name="address"
                  type="text"
                  id="deliveryAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={disableInputContact}
                />
              </span>
            </form>
          </span>
        </section>
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
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  name="display_name"
                  type="text"
                  id="displayName"
                  value={display_name}
                  disabled={disableInputDetail}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </span>
              <span className={styles["first-name"]}>
                <label htmlFor="firstName">First name:</label>
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  name="first_name"
                  type="text"
                  id="firstName"
                  value={first_name}
                  disabled={disableInputDetail}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </span>
              <span className={styles["last-name"]}>
                <label htmlFor="lastName">Last name:</label>
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  name="last_name"
                  type="text"
                  id="lastName"
                  value={last_name}
                  disabled={disableInputDetail}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </span>
            </span>
            <span className={styles["details__right-side"]}>
              <span className={styles.date}>
                <label htmlFor="birth">DD/MM/YY</label>
                {loading && (
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loading...
                  </span>
                )}
                <input
                  name="birth"
                  type="text"
                  id="birth"
                  value={birth}
                  disabled={disableInputDetail}
                  onChange={(e) => setBirth(e.target.value)}
                />
              </span>
              <span className={styles.gender}>
                <span>
                  <input
                    type="radio"
                    id={gender}
                    value={gender === "Male" ? gender : "Male"}
                    disabled={disableInputDetail}
                    name={gender}
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "Male" && true}
                  />
                  <label htmlFor="male">Male</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id={gender}
                    value={gender === "Female" ? gender : "Female"}
                    disabled={disableInputDetail}
                    name={gender}
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "Female" && true}
                  />
                  <label htmlFor="male">Female</label>
                </span>
              </span>
            </span>
          </section>
          <section className={styles.buttons}>
            <p>Do you want to save the change?</p>
            <button
              className={
                !address ||
                !display_name ||
                !first_name ||
                !last_name ||
                !gender ||
                !birth
                  ? styles["btn-save"]
                  : styles["btn-save-active"]
              }
              onClick={handleSaveForm}
              disabled={
                !address ||
                !display_name ||
                !first_name ||
                !last_name ||
                !gender ||
                !birth
              }
            >
              Save Change
            </button>
            <button
              className={
                !address &&
                !display_name &&
                !first_name &&
                !last_name &&
                !gender &&
                !birth
                  ? styles["btn-cancel"]
                  : styles["btn-cancel-active"]
              }
              onClick={handleCancelForm}
            >
              Cancel
            </button>
            <button className={styles["btn-edit"]}>Edit Password</button>
            <button onClick={handleModal} className={styles["btn-log-out"]}>
              Log Out
            </button>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
