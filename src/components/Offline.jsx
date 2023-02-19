import React from "react";
import useNavigatorOnline from "use-navigator-online";
import DisconnectIcon from "../assets/icons/disconnected.png";

const Offline = ({ children }) => {
  const { isOnline } = useNavigatorOnline();
  return (
    <>
      {isOnline ? (
        children
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <img
            src={DisconnectIcon}
            alt="Disconnect Icon"
            style={{ width: "75px", heigth: "75px" }}
          />
          <h3 style={{ fontSize: "16px", color: "#4f5665" }}>
            Your are currently offline
          </h3>
        </div>
      )}
    </>
  );
};

export default Offline;
