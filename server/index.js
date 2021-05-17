const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(express.json());
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3002",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(3002, () => {
  console.log("my server is running on port 3002");
});
