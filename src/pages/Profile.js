import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/actions/auth";
import ProfilesAction from "../redux/actions/profile";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import TitleBar from "../components/TitleBar";

import pen from "../assets/icons/pen.svg";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [picture, setPicture] = useState("");
  const accessToken = localStorage.getItem("access-token");
  const accessRole = localStorage.getItem("access-role");

  // Get Contact Profile
  const contactProfile = useSelector(
    (state) => state.profiles.resultProfileContact.result[0]
  );

  // Get Detail Profile
  const detailProfile = useSelector(
    (state) => state.profiles.resultProfileDetail.result[0]
  );

  useEffect(() => {
    //Default Contacts input values
    setAddress(detailProfile?.address);

    //Default Details input values
    setDisplayName(detailProfile?.display_name);
    setFirstName(detailProfile?.first_name);
    setLastName(detailProfile?.last_name);
    setGender(detailProfile?.gender);
    setBirth(detailProfile?.birth);
    setPicture(detailProfile?.picture);
  }, [
    detailProfile?.address,
    detailProfile?.display_name,
    detailProfile?.first_name,
    detailProfile?.last_name,
    detailProfile?.gender,
    detailProfile?.birth,
    detailProfile?.picture,
  ]);

  // Handle Logout
  const handleLogOut = () => {
    dispatch(
      authAction.logoutThunk(
        accessToken,
        "",
        resFulfilledLogout,
        resRejectedLogout,
        ""
      )
    );
  };

  const resFulfilledLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const resRejectedLogout = (error) => {
    console.log(error.message);
  };

  // Handle Upload Image
  const handleUploadImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setPicture(uploaded);
  };

  // Handle Save Form
  const handleSaveForm = () => {
    let formData = new FormData();
    formData.append("address", address);
    formData.append("display_name", display_name);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("birth", birth);
    formData.append("gender", gender);
    formData.append("picture", picture);

    let body = formData;

    dispatch(
      ProfilesAction.editProfileThunk(
        body,
        accessToken,
        resFulfilledEditProfile,
        resRejectedEditProfile
      )
    );
  };

  const resFulfilledEditProfile = (response) => {
    localStorage.removeItem("access-picture");
    localStorage.setItem("access-picture", response.result[0].picture);
    window.location.reload();
  };

  const resRejectedEditProfile = (error) => {
    console.log(error.message);
  };

  const handleCancelForm = () => {
    setAddress(detailProfile?.address);
    setDisplayName(detailProfile?.display_name);
    setFirstName(detailProfile?.first_name);
    setLastName(detailProfile?.last_name);
    setGender(detailProfile?.gender);
    setBirth(detailProfile?.birth);
  };

  // Handle Modal
  const handleModal = () => setModal(!modal);

  const handleInputContact = () => {
    setDisableInputContact(!disableInputContact);
  };

  const handleInputDetail = () => {
    setDisableInputDetail(!disableInputDetail);
  };

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
                src={picture}
                alt="Profile"
                className={styles["profile__image"]}
              />
              <span className={styles["btn-profile"]}>
                <input type="file" />
              </span>
              <p className={styles["display-name"]}>{display_name}</p>
              <p className={styles.email}>{contactProfile?.email}</p>
            </span>
          ) : (
            <span className={styles.profile}>
              <img
                src={previewImage ? previewImage : picture}
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
              <p className={styles["display-name"]}>{display_name}</p>
              <p className={styles.email}>{contactProfile?.email}</p>
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
                <input
                  type="text"
                  id="emailAddress"
                  value={contactProfile?.email}
                  disabled
                />
              </span>
              <span className={styles["mobile-number"]}>
                <label htmlFor="mobileNumber">Mobile number:</label>
                <input
                  type="text"
                  id="mobileNumber"
                  value={contactProfile?.phone_number}
                  disabled
                />
              </span>
              <span className={styles["delivery"]}>
                <label htmlFor="deliveryAddress">Delivery address:</label>
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
