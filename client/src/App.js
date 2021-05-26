import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
// import { useUser } from "./context/auth";
// import AuthenticatedApp from "./authenticated-app";
// import UnauthenticatedApp from "./unauthenticated-app";
import PostPage from "./Pages/Blog/Post"; // NEW
import HomePage from "./Pages/Home/HomePage";
import AboutUs from "./Pages/AboutUs/AboutUsPage";
import BlogPage from "./Pages/Blog/BlogPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import ChallengesPage from "./Pages/Challenges/ChallengesPage";
import ContactPage from "./Pages/Contact/ContactPage";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Game from "./Pages/Game/Game";
import Logo from "./Media/c4cbr.png";
import Deck from "./Components/Deck/Deck";
import axios from "axios";
import Deku from "./Media/avatars/deku.png";
import Pain from "./Media/avatars/pain.png";
import Asuna from "./Media/avatars/asuna.jpeg";
import White from "./Media/avatars/white.jpeg";

const Navigation = (props) => {
  const deck = new Deck();
  const [myDeck] = useState(deck.deck);

  const [click, setClicked] = useState(false); // for the dropdown buttons
  const [cardHovered, setHovered] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setName] = useState(props.name);
  const [level, setLevel] = useState(props.level);
  const [picture, setPicture] = useState(White);
  useEffect(() => {
    setLoginStatus(props.loginStatus);
  }, [props.loginStatus]);

  useEffect(() => {
    axios.get("http://localhost:3002/get-data").then((res) => {
      if (res.data.loggedIn == true) {
        setPicture(res.data.picture);
      }
    });
  }, []);
  const HandleClick = () => {
    // channges state to opposite of current state
    setClicked(!click);
  };

  console.log(props);

  return (
    <nav className="navbar">
      <NavLink
        style={{ textDecoration: "none" }}
        className="nav-item nav-logo"
        exact
        to="/"
      >
        <div
          class="logo-container"
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            class="card-div"
            style={cardHovered ? { transform: "scale(1.1)" } : null}
          >
            <div
              class="card-logo card1"
              style={{ color: "black" }}
              data-value={myDeck[32]}
            >
              {myDeck[33]}
            </div>
            <div
              class="card-logo card2"
              style={{ color: "black" }}
              data-value={myDeck[3]}
              style={{ color: "red" }}
            >
              {myDeck[3]}
            </div>
            <div
              class="card-logo card3"
              style={{ color: "black" }}
              data-value={myDeck[24]}
            >
              {myDeck[24]}
            </div>
            <div
              class="card-logo card4"
              style={{ color: "red" }}
              data-value={myDeck[51]}
            >
              {myDeck[51]}
            </div>
            <div
              class="card-logo card5"
              style={{ color: "black" }}
              data-value={myDeck[13]}
            >
              {myDeck[13]}
            </div>
          </div>
          <div class="logo-text" style={cardHovered ? { color: "red" } : null}>
            Carbs
            <span
              className="num-logo"
              style={cardHovered ? { color: "white" } : null}
            >
              4
            </span>
            Cards
          </div>
        </div>
      </NavLink>
      <div className="icon" onClick={HandleClick}>
        <i
          className={
            click
              ? "fa fa-arrow-down fa-arrow-down1"
              : "fa fa-arrow-up fa-arrow-up1"
          }
        ></i>{" "}
        {/*if click is true, call the arrow down class, else call the arrow up class*/}
      </div>
      <ul className={click ? "nav-list open" : "close nav-list"}>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link"
            exact
            to="/challenges"
          >
            Challenges
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link"
            exact
            to="/about-us"
          >
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link"
            exact
            to="/contacts"
          >
            Contacts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link"
            exact
            to="/blog"
          >
            Blog
          </NavLink>
        </li>
        {props.loginStatus ? (
          <li className="nav-item dropdown ">
            <Link
              onClick={() => {
                setClicked(false);
              }}
              className=" dropbtn"
              exact
              to="/user-profile"
            >
              <img
                className="profile-pic"
                src={props.picture === "default" ? White : props.picture}
                alt="pain/png"
              />
            </Link>
            <div class="dropdown-content">
              <Link className="droplist" to="/user-profile">
                {props.name}'s Profile
              </Link>
              <button onClick={props.logout} className="droplist">
                Log Out
              </button>
            </div>
          </li>
        ) : (
          <li className="nav-item">
            <NavLink
              onClick={() => {
                setClicked(false);
              }}
              className="nav-link nav-highlight"
              exact
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: "",
      name: "",
      level: "",
      picture: White,
    };
  }
  componentWillMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          loginStatus: true,
          name: response.data.user[0].firstname,
          level: response.data.user[0].level,
        }));
      } else {
        this.setState((state) => ({
          loginStatus: false,
          name: "",
          level: "",
        }));
      }
    });
    axios.get("http://localhost:3002/get-data").then((res) => {
      if (res.data.loggedIn == true) {
        this.setState((state) => ({
          picture: res.data.picture,
        }));
      }
    });
  }
  LogOut = () => {
    window.location.reload();
    window.location.replace("/");
    axios
      .get("http://localhost:3002/logout")
      .then((resp) => {
        console.log(resp);
      })
      .then(() => {
        window.location.reload();
      });
    this.setState((state) => ({
      loginStatus: false,
    }));
  };
  setLoginStatus = () => {
    this.setState((state) => ({
      loginStatus: true,
    }));
  };
  setPicture = () => {
    this.setState((state) => ({
      picture: this.state.picture,
    }));
  };

  render() {
    return (
      <Router>
        <Navigation
          loginStatus={this.state.loginStatus}
          name={this.state.name}
          level={this.state.level}
          picture={this.state.picture}
          logout={this.LogOut}
        />
        <div>
          <Switch>
            <Route
              path="/login"
              render={(props) => {
                return <LoginPage login={this.setLoginStatus} />;
              }}
            />
            <Route path="/signup" component={SignUpPage}></Route>
            <Route path="/post" component={PostPage}></Route>
            <Route path="/blog" component={BlogPage}></Route>
            <Route path="/about-us" component={AboutUs}></Route>
            <Route path="/contacts" component={ContactPage}></Route>
            <Route path="/challenges" component={ChallengesPage}></Route>
            <Route
              path="/user-profile"
              render={(props) => {
                return <UserProfile setPic={this.setPicture} />;
              }}
            ></Route>
            <Route path="/game" component={Game}></Route>
            <Route
              exact
              path="/"
              render={(props) => {
                return <HomePage login={this.setLoginStatus} />;
              }}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
