
import React from "react";
import { useNavigate } from "react-router-dom";

const withNavigate = (Component) => {
 
  function WithNavigate(props) {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  }
  return WithNavigate;
}

export default withNavigate;
