import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoggedOutRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export { LoggedOutRouter };
