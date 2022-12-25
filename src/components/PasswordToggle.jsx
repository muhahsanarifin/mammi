import React from "react";

const PasswordToggle = ({ onClickParams, stateParams }) => {
  const ptSection = {
    position: "absolute",
    width: "fit-content",
    right: "1.5rem",
    cursor: "pointer",
  };

  const text = { marginBottom: "0", fontSize: "14px" };

  const bgText = {
    marginBottom: "0",
    background: "#F8F8F8",
    fontSize: "14px",
    padding: "0.2rem",
    borderRadius: "2px",
  };

  return (
    <>
      <section style={ptSection}>
        <span onClick={onClickParams}>
          {stateParams ? (
            <p style={text}>Show</p>
          ) : (
            <p style={(text, bgText)}>Hide</p>
          )}
        </span>
      </section>
    </>
  );
};

export default PasswordToggle;
