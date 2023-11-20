import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  // get user info from session
  const userJson = sessionStorage.getItem("user");
  console.log(userJson);

  // parse user info to obj
  const userObj = JSON.parse(userJson);

  // if user exist then update the auth to true
  const auth = userObj?._id;

  return auth ? children : <Navigate to="/" />;
};
