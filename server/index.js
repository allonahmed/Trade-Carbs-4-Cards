const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express.json());
const cookieParser = require("cookie-parser");
const session = require("express-session");
const filestore = require("session-file-store")(session);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: "options",
    key: "c4c",
    secret: "allon", // Secret key,
    saveUninitialized: true,
    resave: true,
    store: new filestore(),
    cookie: {
      maxAge: 60 * 1000 * 60, // 1hr
    },
  })
);

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "saw",
  port: "3306",
});

const levelGetter = (exp) => {
  return exp / 500;
};

app.post("/signup", (req, res) => {
  const info = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  bcrypt.hash(info.password, saltRounds, (error, hash) => {
    if (error) console.log(error);

    const query =
      "INSERT INTO saw.userinfo (firstname, lastname, email, password,exp, level, cardback, picture,bio) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(
      query,
      [
        info.firstName,
        info.lastName,
        info.email,
        hash,
        0,
        100,
        "default",
        "default",
        `${info.firstName}'s bio`,
      ],
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = "SELECT * FROM saw.userinfo WHERE email = ?";
  db.query(query, email, (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err1, resp) => {
        if (resp) {
          req.session.user = result; //creating cookie session annd passing all the data from result
          console.log(req.session.user);

          res.send(result);
        } else {
          res.send({ message: "Wrong Username/password Combination" });
        }
      });
    } else {
      res.send({ message: "User does not exist!" });
      console.log(result);
    }
  });
});

app.get("/login", (req, res) => {
  console.log("yoloswag", req.session.user);

  if (req.session.user) {
    // if our user session exists

    res.send({
      loggedIn: true,
      user: req.session.user,
    });
    // res.redirect("/");
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/update-avatar", (req, res) => {
  const picture = req.body.picture;
  const email = req.body.email;
  console.log(picture);

  const query = "UPDATE saw.userinfo SET picture = ? WHERE email = ?";
  db.query(query, [picture, email], (err, result) => {
    if (err) console.log(err);
    else {
      req.session.user[0].picture = picture;
      if (req.session.user) {
        res.send();
      }
    }
  });
});

app.post('/post-workout', (req,res)=> {

})

// app.delete("/logout", (req, res) => {
//   if (req.session.user) {
//     req.session.user.destroy((err) => {
//       if (err) {
//         res.status(400).send("unable to logout");
//       } else {
//         res.send("Logout successful");
//         res.redirect("/");
//       }
//     });
//   } else {
//     res.end();
//   }
// });
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    } else {
      res.clearCookie("options");
    }
  });
});

app.get("/get-data", (req, res) => {
  console.log("my data: ", req.session.user);

  if (req.session.user) {
    // if our user session exists

    res.send({
      loggedIn: true,
      user: req.session.user,
      picture: req.session.user[0].picture,
    });
    // res.redirect("/");
  } else {
    res.send({ loggedIn: false });
  }
});

app.listen(3002, () => {
  console.log("my server is running on port 3002");
});
