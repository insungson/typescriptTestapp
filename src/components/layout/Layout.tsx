import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import classes from "./Layout.module.css";

const Layout: React.FC = (props) => {
  // 기존과는 다르게... LInk 로 연결시키려면... BrowserRouter로 상위 컴포넌트를 감싸야한다.
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <main className={classes.main}>{props.children}</main>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
};

export default Layout;
