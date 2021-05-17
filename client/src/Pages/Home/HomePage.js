import React from "react";
import "./Home.css";
import "../../App.css";
import { Component } from "react";
import Login from "../../Media/login.png";
import Guest from "../../Media/guest.png";
import { Link } from "react-router-dom"; // to link to other pages when clicking on login button
import TextLoop from "react-text-loop";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: false, //set status for whether the user wants to play as a guest
      login: false, // sets status for whether the user wants to login
      buttonClass: "home-button", // to manage the button classlist
      containerClass: "home-container", // to manage the button classlist
      buttonMouseOver: false, // handles what to do when hovering over the buttons
    };
  }
  render() {
    const GuestClick = () => {
      // for info purposes
      return (this.setState = (state) => ({
        guest: (state.guest = true),
      }));
    };

    const MouseOn = () => {
      // if Moused over, changes the state of the container class, to add styling to other elements when hovering over our buttons
      return this.setState((state) => ({
        containerClass: (state.containerClass =
          "home-container edit-background"),
        buttonMouseOver: (state.buttonMouseOver = true),
      }));
    };

    const MouseLeave = () => {
      return this.setState((state) => ({
        containerClass: (state.containerClass = "home-container"),
        buttonMouseOver: (state.buttonMouseOver = false),
      }));
    };

    return (
      <div class="container">
        <div className={this.state.containerClass}>
          <div className="home-text">
            <TextLoop className="adjectives" interval={1000} mask={true}>
              <span className={this.state.classInnerText}>Healthy</span>
              <span className={this.state.classInnerText}>Fast</span>
              <span className={this.state.classInnerText}>Simple</span>
              <span className={this.state.classInnerText}>FREE</span>
            </TextLoop>
            <span className="innerText text">Trade Carbs 4 Cards</span>
            <span className={this.state.classInnerText}>Play Now</span>
          </div>
          <div className="home-button-div">
            <div className="icon-div"></div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              <button
                className={this.state.buttonClass}
                onMouseOver={MouseOn}
                onMouseLeave={MouseLeave}
              >
                {" "}
                <p style={{ marginLeft: "4.7rem" }}>Log In </p>{" "}
                <i class="fas fa-sign-in-alt"></i>
              </button>{" "}
            </Link>
            <Link to="/game" style={{ textDecoration: "none" }}>
              <button
                onClick={GuestClick}
                className={this.state.buttonClass}
                onMouseOver={MouseOn}
                onMouseLeave={MouseLeave}
              >
                {" "}
                <p style={{ marginLeft: "3.5rem" }}>Guest Play</p>
                <img
                  className="home-button-img"
                  src={Guest}
                  alt="guest-play"
                ></img>{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
