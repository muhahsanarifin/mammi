import React from "react";
import { Spinner } from "reactstrap";

const LoaderBtn = () => {
  return (
    <Spinner style={{ color: "#6a4029", width: "24px", height: "24px" }}>
      Loading...
    </Spinner>
  );
};

export default LoaderBtn;
