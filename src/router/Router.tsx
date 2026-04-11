import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "../constants";
import Loader from "../pages/Loader/Loader";
import { isAuthenticated } from "../utils/auth";

// Lazy loading
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const OTP = lazy(() => import("../pages/auth/OTP"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ConnectPages = lazy(() => import("../pages/ConnectPages"));
const Processing = lazy(() => import("../pages/Processing"));

const Error = lazy(() => import("../pages/Error/Error"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.OTP} element={<OTP />} />
          <Route path={ROUTES.ERROR} element={<Error />} />

          {/* 🔒 Protected Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <Navigate to={ROUTES.LOGIN} replace />
              )
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              isAuthenticated() ? (
                <Profile />
              ) : (
                <Navigate to={ROUTES.LOGIN} replace />
              )
            }
          />

          <Route
            path={ROUTES.CONNECT}
            element={
              isAuthenticated() ? (
                <ConnectPages />
              ) : (
                <Navigate to={ROUTES.LOGIN} replace />
              )
            }
          />

          <Route
            path={ROUTES.PROCESSING}
            element={
              isAuthenticated() ? (
                <Processing />
              ) : (
                <Navigate to={ROUTES.LOGIN} replace />
              )
            }
          />

          {/* 🔁 Catch all → Home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;