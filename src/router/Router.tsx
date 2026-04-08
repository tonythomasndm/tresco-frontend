import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "../constants";

// Lazy loading
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));

const Router = () => {
  const isAuthenticated = false; // later from auth context

  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />

          {/* Protected Route */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isAuthenticated ? (
                <Signup />
              ) : (
                <Navigate to={ROUTES.LOGIN} />
              )
            }
          />

          {/* Default */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
};

export default Router;