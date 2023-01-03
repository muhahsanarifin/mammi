import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (token, trueCondition) => {
  const navigation = useNavigate();

  useEffect(() => {
    if(token) {
      navigation(trueCondition)
    }
  }, []);
};

export default PrivateRoute;
