import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import { useAppSelector } from "../store/index";

const LoggedInRouter: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
    </Routes>
  );
};

export { LoggedInRouter };
