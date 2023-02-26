import React from "react";
import { Spinner } from "reactstrap";

const LoaderBtn = ({ loaderStyle }) => {
  return <Spinner className={loaderStyle}>Loading...</Spinner>;
};

export default LoaderBtn;
