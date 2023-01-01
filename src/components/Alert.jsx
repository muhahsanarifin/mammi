import React from "react";
import { Alert } from "reactstrap";

const Alerts = ({ onClick, visible, decs, toggle }) => {
  return (
    <span
      style={{
        // border: "1px solid",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100vw",
        zIndex: "100",
      }}
    >
      <Alert
        color="info"
        // isOpen={visible}
        toggle={toggle}
        style={{ marginBottom: "0" }}
      >
        {decs}.{" "}
        <span
          onClick={onClick}
          style={{ fontWeight: "700", cursor: "pointer" }}
        >
          Click this
        </span>
      </Alert>
    </span>
  );
};

export default Alerts;
