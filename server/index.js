const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3002",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());
const bcrypt = require("bcrypt");
app.use(express.json());
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));

app.post("/post-form/", (req, res) => {
  const name = req.body.name;
  const comment = req.body.comment;
  const query = "INSERT INTO saw.posts (name, comments) VALUES (?,?)";
  db.query(query, [name, comment], (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
});

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "saw",
  port: "3306",
});

app.listen(3002, () => {
  console.log("my server is running on port 3002");
});
