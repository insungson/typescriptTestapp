import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout/Layout";
import { LoggedInRouter } from "./routers/loggedInRouter";
import { LoggedOutRouter } from "./routers/loggedOutRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Layout>
      <LoggedInRouter />
    </Layout>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
