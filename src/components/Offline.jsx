import React, { useEffect, useState } from "react";
import useNavigatorOnline from "use-navigator-online";
import offlineIcon from "../assets/icons/offlineIcon.svg";

const Offline = ({ children }) => {
  const [image, setImage] = useState();
  const { isOnline, backOffline } = useNavigatorOnline();

  useEffect(() => {
    setImage(offlineIcon);
  }, [backOffline]);
  
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
            background: "#BCBABA",
          }}
        >
          <img
            src={image}
            alt="Offline Icon"
            style={{ width: "75px", heigth: "75px" }}
          />
          <h3 style={{ fontSize: "28px", fontWeight: "900" }}>
            No internet Connection
          </h3>
          <p
            style={{ fontSize: "16px", color: "#4f5665", textAlign: "center" }}
          >
            Your internet connection is currently not available please check or
            try again.
          </p>
        </div>
      )}
    </>
  );
};

export default Offline;
