import React, { useEffect } from "react";
import "./Home.css";
import "../../App.css";
import { Component } from "react";
import Login from "../../Media/login.png";
import Guest from "../../Media/guest.png";
import { Link } from "react-router-dom"; // to link to other pages when clicking on login button
import TextLoop from "react-text-loop";
import Card from "../../Components/Card/Card";
import Deck from "../../Components/Deck/Deck";
import { randomNumber } from "../../helpers";
import { AnimateKeyframes } from "react-simple-animate";
import axios from "axios";

export default class HomePage extends Component {
  constructor(props) {
    const deck = new Deck();
    super(props);
    this.state = {
      guest: false, //set status for whether the user wants to play as a guest
      login: false, // sets status for whether the user wants to login
      buttonClass: "home-button", // to manage the button classlist
      containerClass: "home-container", // to manage the button classlist
      buttonMouseOver: false, // handles what to do when hovering over the buttons
      // myDeck: deck.deck,
      loginStatus: false,
      name: "",
      level: "",
    };
  }

  componentWillMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          loginStatus: this.props.login,
          name: response.data.user[0].firstname,
          level: response.data.user[0].level,
        }));
      }
    });
  }

  render() {
    // useEffect(() => {
    //   this.setState((state) => ({
    //     loginStatus: false,
    //   }));
    // }, [this.state.loginStatus]);
    const deck = new Deck();
    const myDeck = deck.deck;
    const GuestClick = () => {
      // for info purposes
      return (this.setState = (state) => ({
        guest: (state.guest = true),
      }));
    };

    const MouseOn = () => {
      // if Moused over, changes the state of the container class, to add styling to other elements when hovering over our buttons
      return this.setState((state) => ({
        containerClass: (state.containerClass = "home-container"),
        buttonMouseOver: (state.buttonMouseOver = true),
      }));
    };

    const MouseLeave = () => {
      return this.setState((state) => ({
        containerClass: (state.containerClass = "home-container"),
        buttonMouseOver: (state.buttonMouseOver = false),
      }));
    };

    const styleFloat = (data) => {
      let x = randomNumber(-200, 90, 1);
      let y = randomNumber(-10, 65, 1);
      let rx = randomNumber(-5, 5, 1);

      let style = {
        marginLeft: `${x}%`,
        marginTop: `${y}vh`,
        color: "black",
      };
      // console.log("data", data);
      if (data) {
        if (data[data.length - 1] === "♦" || data[data.length - 1] === "♥") {
          style.color = "red";
        }
      }
      return style;
    };

    return (
      <div class="container">
        {myDeck.map((val, i) => {
          if (i % 2 === 0) {
            return (
              <AnimateKeyframes
                play={true}
                duration={5}
                iterationCount="infinite"
                keyframes={[
                  `transform: translateY(0px) `,
                  `transform: translateY(100px) `,
                  `transform: translateY(0)`,
                ]}
              >
                <div
                  key={i}
                  className="floating-card-div "
                  style={styleFloat(myDeck[i])}
                  data-value={myDeck[i]}
                >
                  {myDeck[i][myDeck[i].length - 1]}
                </div>
              </AnimateKeyframes>
            );
          } else {
            return (
              <AnimateKeyframes
                play={true}
                duration={5}
                iterationCount="infinite"
                keyframes={[
                  `transform: translateY(0px) `,
                  `transform: translateY(-100px) `,
                  `transform: translateY(0)`,
                ]}
              >
                <div
                  key={i}
                  className="floating-card-div "
                  style={styleFloat(myDeck[i])}
                  data-value={myDeck[i]}
                >
                  {myDeck[i][myDeck[i].length - 1]}
                </div>
              </AnimateKeyframes>
            );
          }
        })}

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
          {this.state.loginStatus ? (
            <div className="home-button-div">
              <Link to="/game" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    color: "white",
                    background: "#bd060f ",
                    border: "2px solid black",
                  }}
                  onClick={GuestClick}
                  className={this.state.buttonClass + " guest"}
                >
                  {" "}
                  <p style={{ marginLeft: "3.5rem" }}>Play Now</p>{" "}
                  <i
                    style={{ fontSize: "3rem", color: "white" }}
                    class="fas fa-sign-in-alt"
                  ></i>{" "}
                </button>
              </Link>
            </div>
          ) : (
            <div className="home-button-div">
              <Link to="/login" style={{ textDecoration: "none" }}>
                {" "}
                <button
                  className={`${this.state.buttonClass} +  login`}
                  style={{
                    background: "white",
                    color: "black",
                    border: "2px solid black",
                  }}
                >
                  {" "}
                  <p style={{ marginLeft: "4.7rem" }}>Log In </p>{" "}
                  <i
                    style={{ fontSize: "2.8rem", color: "black" }}
                    class="far fa-user"
                  ></i>
                </button>{" "}
              </Link>
              <Link to="/game" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    color: "white",
                    background: "#bd060f ",
                    border: "2px solid black",
                  }}
                  onClick={GuestClick}
                  className={this.state.buttonClass + " guest"}
                >
                  {" "}
                  <p style={{ marginLeft: "3.5rem" }}>Guest Play</p>{" "}
                  <i
                    style={{ fontSize: "3rem", color: "white" }}
                    class="fas fa-sign-in-alt"
                  ></i>{" "}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
