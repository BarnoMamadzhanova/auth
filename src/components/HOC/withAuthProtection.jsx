import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const withAuthProtection = (Component) => {
  return (props) => {
    const isLoggedIn = useSelector((state) => !!state.auth.accessToken);

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default withAuthProtection;
