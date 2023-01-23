import React from "react";
import { Spinner } from "reactstrap";

const LoaderBtn = ({loaderStyle}) => {
  console.log(loaderStyle)
  return <Spinner className={loaderStyle}>Loading...</Spinner>;
};

export default LoaderBtn;
