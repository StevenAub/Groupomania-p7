const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");
const path = require("path");
const userRoutes = require("./src/routes/user");
const stuffRoutes = require("./src/routes/post");
const auth = require("./src/middleware/auth");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes

app.use("/api/auth", userRoutes);

app.use("/api/post", stuffRoutes);

module.exports = app;
