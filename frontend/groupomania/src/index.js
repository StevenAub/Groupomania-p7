import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import OnePost from "./Components/Posts/OnePost";
import GetUser from "./Components/Profil/Profil";

//import Inscription from "./Components/Inscription/Inscription";
//import NewPost from "./Components/Posts/NewPost";

import LoginPage from "./Pages/Connexion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<App />} />
      </Routes>
      <Routes>
        <Route path="/home/post/:id" element={<OnePost />} />
      </Routes>
      <Routes>
        <Route path="/home/user/:id" element={<GetUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
