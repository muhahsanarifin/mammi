import React from "react";

const Button = ({ buttonName, status, OnDelete, displayButton }) => {
  const buttonSection = {
    // border: "1px solid red",
    display: "flex",
    flexDirection: "column",
  };
  const titleSection = {
    fontSize: "14px",
    color: "#54B435",
  };

  const buttonComponent = {
    width: "fit-content",
    padding: "0.3rem",
    fontSize: "12px",
    outline: "none",
    border: "0",
    borderRadius: "4px",
    backgroundColor: "#DD5353",
    color: "#ffffff",
    fontWeigth: "600",
    display: `${displayButton}`,
  };
  return (
    <>
      <span style={buttonSection}>
        <h3 style={titleSection}>{status}</h3>
        <button style={buttonComponent} onClick={OnDelete}>
          {buttonName}
        </button>
      </span>
    </>
  );
};

export default Button;
