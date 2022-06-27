import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import OnePost from "./Components/Posts/OnePost";
import GetUser from "./Components/Profil/Profil";
import UpdateUser from "./Components/Profil/ModifyProfil";
import Error from "./Components/Error/Error";
import LoginPage from "./Pages/Connexion";

const root = ReactDOM.createRoot(document.getElementById("root"));

// {" "} line 21 should be removed
// And you can use nested routes to be cleaner
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route exact path="/" element={<LoginPage />} />{" "}
        <Route path="/home" element={<App />} />
        <Route path="home/post/:id" element={<OnePost />} />
        <Route path="/home/user/:id" element={<GetUser />} />
        <Route path="/home/user/:id/update" element={<UpdateUser />} />
      </Routes>
    </Router>{" "}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
