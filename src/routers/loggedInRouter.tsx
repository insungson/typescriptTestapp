import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import AllQuotes from "../pages/AllQuotes";
import NewQuotes from "../pages/NewQuotes";

import { useAppSelector } from "../store/index";

const LoggedInRouter: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // 기존의 <Redirect to='/auth' />  대신... <Navigate to='/auth' />  로 바뀌게 되었다.
  // (다른 모든 라우터를 나타내는 * 일때.. Navigate to 로 처리하면 Route 내부의 Redirect 와 같은 역할을 한다!!)
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quotes" element={<AllQuotes />} />
      {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
      {isLoggedIn && (
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/auth" />}
        />
      )}
      {isLoggedIn && <Route path="/new-quote" element={<NewQuotes />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { LoggedInRouter };
