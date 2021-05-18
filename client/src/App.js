import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  NavLink,
} from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import AboutUs from "./Pages/AboutUs/AboutUsPage";
import MerchPage from "./Pages/Merch/MerchPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import ChallengesPage from "./Pages/Challenges/ChallengesPage";
import ContactPage from "./Pages/Contact/ContactPage";
import Game from "./Pages/Game/Game";
import Logo from "./Media/c4cbr.png";

const Navigation = (props) => {
  const [click, setClicked] = useState(false); // for the dropdown buttons

  const HandleClick = () => {
    // channges state to opposite of current state
    setClicked(!click);
  };
  return (
    <nav className="navbar">
      <NavLink className="nav-item nav-logo" exact to="/">
        <img className="app-logo" src={Logo} alt="Carbs4Cards"></img>
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
            to="/merch"
          >
            Merch
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link"
            exact
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            onClick={() => {
              setClicked(false);
            }}
            className="nav-link nav-highlight"
            exact
            to="/signup"
          >
            Sign Up{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

class App extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     clicked: 'false'
  //   }
  // }

  render() {
    return (
      <Router>
        <Navigation />
        <div>
          <Switch>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/signup" component={SignUpPage}></Route>
            <Route path="/merch" component={MerchPage}></Route>
            <Route path="/about-us" component={AboutUs}></Route>
            <Route path="/contacts" component={ContactPage}></Route>
            <Route path="/challenges" component={ChallengesPage}></Route>
            <Route path="/game" component={Game}></Route>
            <Route exact path="/" component={HomePage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
