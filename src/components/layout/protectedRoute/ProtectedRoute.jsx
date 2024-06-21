import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  is_admin,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  if (adminRoute && !is_admin) {
    return <Navigate to={"/unauthorize"} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
