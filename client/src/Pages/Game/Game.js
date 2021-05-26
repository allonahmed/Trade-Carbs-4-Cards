import React, { useRef, useState } from "react";
import "../../App.css";
import "./Game.css";
import { Component } from "react";
import Card from "../../Components/Card/Card";
import Deck from "../../Components/Deck/Deck";
import FaceDown from "../../Components/Card/FaceDown";
import SignUpPage from "../SignUp/SignUpPage";
import Squats from "../../Media/workout-icons/squats.png";
import Planks from "../../Media/workout-icons/planks.png";
import Pushups from "../../Media/workout-icons/pushups.png";
import Situps from "../../Media/workout-icons/situps.jpeg";
import Jumping from "../../Media/workout-icons/jumping.png";
import Red from "../../Media/cards/reddefault.png";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";

export default class Game extends Component {
  constructor(props) {
    super(props);
    const deck1 = new Deck(); // creating Deck object
    this.state = {
      login: false,
      guest: false,
      cards: deck1.deck, // initializes the deck of cards
      drawnCards: [], // stores the cards we have already drawn
      index: 0, // keeps track of the index of our drawn cards
      count: 52, // keeps tract of times button is clicked
      card: "", // single card from deck array
      shuffled: deck1.shuffle(deck1.deck), //shuffled array of the deck
      gameContainerClass: "game-container",
      timed: false,
      selectedTime: "untimed",
      selectedExercise: "",
      styleTimedButton: { height: "10rem", color: "black" },
      styleUntimedButton: {
        background: "#fde9e2",
        border: "3px solid rgba(255, 0, 0)",
        height: "10rem",
        color: "black",
      },
      enhance: false,
      selectedInterval: 0,
      countDown: "",
      userInfoClass: "user-info",
      question1: false, // if false, show question of exersize, else go to question2
      question2: false, // if false, show question of time, else set play to true
      play: false,
      timerOn: false,
      startWorkout: false,
      pause: true,
      timerHover: false,
      firstname: "",
      lastname: "",
      level: "",
      exp: "",
      email: "",
      startTime: 0,
      totalTime: 0,
      totalpushups: 0,
      totalsitups: 0,
      totaljj: 0,
      totalsquats: 0,
      totaldips: 0,
      cardback: Red,
    };
    this.drawNewCard = this.drawNewCard.bind(this);
  }
  drawNewCard() {
    // adds the cards already drawn
    return this.setState((prevState) => ({
      drawnCards: [
        ...prevState.drawnCards,
        prevState.cards[prevState.cards.length - 1],
      ],
      cards: [...prevState.cards.slice(0, -1)],
    }));
  }
  componentDidMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          login: true,
          firstname: response.data.user[0].firstname,
          lastname: response.data.user[0].lastname,
          level: response.data.user[0].level,
          exp: response.data.user[0].exp,
          // picture: response.data.user[0].picture,
          // cardback: response.data.user[0].cardback,
          // bio: response.data.user[0].bio,
          email: response.data.user[0].email,
          totalpushups: response.data.user[0].totalpushups,
          totalsitups: response.data.user[0].totalsitups,
          totaldips: response.data.user[0].totaldips,
          totalsquats: response.data.user[0].totalsquats,
          totaljj: response.data.user[0].totaljj,
          cardback:
            response.data.user[0].cardback === "default"
              ? Red
              : response.data.user[0].cardback,
        }));
      }
    });
  }
  intervalChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedInterval: e.target.value,
    });
  };

  render() {
    const HandleClick = () => {
      // decriments the count after each click
      if (this.state.count === 52) {
        this.setState((state) => ({
          startTime: Date.now(),
        }));
      } else if (this.state.count === 2) {
        var endTime = Date.now();
        console.log("endtime", endTime);

        var difference = endTime - this.state.startTime;

        console.log("time remianing:", Math.floor(difference / 1000));

        this.setState((state) => ({
          totalTime: Math.floor(difference / 1000),
        }));
      }
      sendData();

      this.setState((state) => ({
        card: (state.card = state.cards[state.count - 1]), // sets the current card to the last element in the shuffled cards deck
        count: state.count - 1, // decriments the count for ux and to keep moving through the cards deck
        index: state.index + 1, // increment the index
      }));
      this.drawNewCard(); // calls the draw new card function
      console.log(this.state.drawnCards[this.state.index - 1]); // for testing, shows current card being drawn
      // if (this.state.)
      if (this.state.selectedTime === "untimed") {
        this.setState((state) => ({
          selectedInterval: (state.selectedInterval = 0),
        }));
      }
    };
    const ButtonText = () => {
      // button text after each click
      let results;
      if (this.state.count === 52) results = "Start Your Workout!";
      else if (this.state.count > 1) results = this.state.count + " cards left";
      else if (this.state.count === 1) results = "1 card left";
      else if (this.state.count === 0) results = "Finished. 0 cards left";
      return results;
    };

    const TimedClick = () => {
      this.setState((state) => ({
        timed: true,
        styleTimedButton: {
          background: "#fde9e2",
          color: "black",
          border: "3px solid rgba(255, 0, 0)",
        },
        styleUntimedButton: {
          border: "3px solid rgba(0, 0, 0, 0.5)",
        },
      }));
    };
    const UnTimedClick = () => {
      this.setState((state) => ({
        timed: false,
        selectedInterval: "",
        styleTimedButton: {
          border: "3px solid rgba(0, 0, 0, 0.5)",

          height: "10rem",
        },
        styleUntimedButton: {
          border: "3px solid rgba(255, 0, 0)",
          height: "10rem",
          color: "black",
        },
      }));
    };

    const userInfoClick = () => {
      if (this.state.userInfoClass === "user-info")
        this.setState((state) => ({
          userInfoClick: (state.userInfoClass = "user-info-small"),
        }));
      else
        this.setState((state) => ({
          userInfoClick: (state.userInfoClass = "user-info"),
        }));
    };
    const nonChooseStyle = (ex) => {
      let style;
      if (
        this.state.selectedExercise === ex ||
        this.state.selectedExercise === ""
      ) {
        style = {
          textDecoration: "none",
          color: "black",
        };
      }
      if (this.state.selectedExercise === ex) {
        style.color = "black";
        style.background = "#fde9e2";
        style.border = "3px solid rgba(255, 0, 0)";
      }

      return style;
    };
    const convert = (data) => {
      let output;
      if (data === "Q") {
        output = 11;
      } else if (data === "K") {
        output = 12;
      } else if (data === "A" || data === "J") {
        output = 13;
      } else {
        output = data;
      }
      return output;
    };
    const Img = () => {
      const c = convert(this.state.card[0]);
      if (this.state.selectedExercise === "Push-ups") {
        return (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src={Pushups}
              alt="squats"
            />
            <p style={{ color: "black" }}>
              {this.state.card.length === 3 ? 10 : c}{" "}
              {this.state.selectedExercise}
            </p>
          </div>
        );
      } else if (this.state.selectedExercise === "Sit-ups") {
        return (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src={Situps}
              alt="situps"
            />
            <p style={{ color: "black" }}>
              {this.state.card.length === 3 ? 10 : c}{" "}
              {this.state.selectedExercise}
            </p>
          </div>
        );
      } else if (this.state.selectedExercise === "Planks") {
        return (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src={Planks}
              alt="planks"
            />
            <p style={{ color: "black" }}>
              {this.state.card.length === 3 ? 10 : c}{" "}
              {this.state.selectedExercise}
            </p>
          </div>
        );
      } else if (this.state.selectedExercise === "Jumping Jacks") {
        return (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src={Jumping}
              alt="jumping jacks"
            />
            <p style={{ color: "black" }}>
              {this.state.card.length === 3 ? 10 : c}{" "}
              {this.state.selectedExercise}
            </p>
          </div>
        );
      }
      if (this.state.selectedExercise === "Squats") {
        return (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src={Squats}
              alt="squats"
            />
            <p style={{ color: "black" }}>
              {this.state.card.length === 3 ? 10 : c}{" "}
              {this.state.selectedExercise}
            </p>
          </div>
        );
      }
    };

    const cardList = this.state.drawnCards.map(
      (
        cardV,
        index // returns an array of all the drawnCards (using map), then placing each element in the array in the Card component
      ) => (
        <Card
          key={index} //error handling
          cardData={cardV}
          // symbol={cardV.length === 2 ? cardV[1] : cardV[2]}
          symbol={Img()}
          suit={cardV[cardV.length - 1]}
          value={cardV.length === 3 ? 10 : cardV[0]}
          back={this.state.cardback}
        />
      )
    );
    const faceDown = this.state.cards.map((val, i) => (
      <FaceDown
        classs="face-down"
        count={i}
        key={i}
        back={this.state.cardback}
      />
    ));
    console.log(
      "startTime:",
      this.state.startTime,
      "  totaltime:",
      this.state.totalTime
    );
    const nextDisable = () => {
      if (this.state.timed) {
        if (this.state.selectedInterval.length === 0) {
          return "disabled";
        }
      }
      return;
    };
    const RenderTime = ({ remainingTime }) => {
      if (!this.state.startWorkout) {
        return (
          <button
            className="start-workout-button"
            style={{
              color: "white",
              background: "transparent",
              height: "90%",
              width: "90%",
              borderRadius: "50%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
            onClick={() => {
              this.setState((state) => ({ startWorkout: true, pause: true }));
              HandleClick();
            }}
          >
            <p>START WORKOUT</p>
            <i class="fas fa-play "></i>
          </button>
        );
      } else
        return (
          <button
            onMouseEnter={() => {
              this.setState((state) => ({ timerHover: true }));
            }}
            onMouseLeave={() => {
              this.setState((state) => ({ timerHover: false }));
            }}
            onClick={() => {
              this.setState((state) => ({
                pause: !this.state.pause,
                startWorkout: true,
              }));
            }}
            style={{
              color: "white",
              background: "transparent",
              height: "90%",
              width: "90%",
              // position: "relative",
              borderRadius: "50%",

              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              border: "none",
            }}
          >
            {this.state.timerHover === false ? (
              <div
                className={!this.state.pause ? "time-paused" : "time"}
                style={remainingTime === 0 ? { fontSize: "24px" } : null}
              >
                {remainingTime === 0 ? "NEXT CARD" : remainingTime + 1}
              </div>
            ) : (
              <div>
                {" "}
                {this.state.pause ? (
                  <i class="fas fa-pause button-icons"></i>
                ) : (
                  <i class="fas fa-play button-icons"></i>
                )}
              </div>
            )}
          </button>
        );
    };

    const sendData = () => {
      if (this.state.count === 1)
        axios.post("http://localhost:3002/post-workout", {
          email: this.state.email,
          timed: this.state.timed === true ? "timed" : "untimed",
          interval: this.state.selectedInterval,
          time: this.state.timed
            ? this.state.selectedInterval * 52
            : this.state.totalTime,
          workout: this.state.selectedExercise,
          reps: 412,
          timePosted: Date(),
        });
      axios.post("http://localhost:3002/update-stats", {
        email: this.state.email,
        totalpushups:
          this.state.selectedExercise === "Push-ups"
            ? this.state.totalpushups + 412
            : this.state.totalpushups,
        totalsitups:
          this.state.selectedExercise === "Sit-ups"
            ? this.state.totalsitups + 412
            : this.state.totalsitups,
        totaljj:
          this.state.selectedExercise === "Jumping Jacks"
            ? this.state.totaljj + 412
            : this.state.totaljj,
        totalsquats:
          this.state.selectedExercise === "Squats"
            ? this.state.totalsquats + 412
            : this.state.totalsquats,
        totaldips:
          this.state.selectedExercise === "Dips"
            ? this.state.totaldips + 412
            : this.state.totaldips,
        workout: this.state.workout,
      });
    };
    console.log("logged in? :", this.state.totalpushups);

    return (
      <div className="container">
        <div className="game-container">
          <div className="deck-spot">
            {this.state.play === true ? ( // only renders the cardList if the count is under 52, which will occur when you click the button after the first time
              <div className="two-decks">
                <div className="face-down-div">{faceDown}</div>
                <div className="card-list-spot">{cardList}</div>
              </div>
            ) : this.state.question1 === false ? (
              <div className="pre-game">
                <div className="workout-settings">
                  <div className="prompt-div">
                    <h3 className="pregame-prompt">Select a workout: </h3>
                  </div>
                  <div className="input-workout-div">
                    <button
                      className="input input-workout left"
                      style={nonChooseStyle("Push-ups")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Push-ups",
                        }));
                      }}
                    >
                      Push-ups
                    </button>
                    <button
                      className="input input-workout right"
                      style={nonChooseStyle("Sit-ups")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Sit-ups",
                        }));
                      }}
                    >
                      Sit-ups
                    </button>
                    <button
                      className="input input-workout left"
                      style={nonChooseStyle("Jumping Jacks")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Jumping Jacks",
                        }));
                      }}
                    >
                      Jumping Jacks
                    </button>
                    <button
                      className="input input-workout right"
                      style={nonChooseStyle("Planks")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Planks",
                        }));
                      }}
                    >
                      Planks
                    </button>
                    <button
                      className="input input-workout left"
                      style={nonChooseStyle("Squats")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Squats",
                        }));
                      }}
                    >
                      Squats
                    </button>
                    <button
                      className="input input-workout right"
                      style={nonChooseStyle("Mixed")}
                      onClick={() => {
                        this.setState((state) => ({
                          selectedExercise: "Mixed",
                        }));
                      }}
                    >
                      Mixed
                    </button>
                  </div>
                  <div className="button-div">
                    <button
                      className="draw-button next-button"
                      disabled={
                        this.state.selectedExercise === "" ? "disabled" : null
                      }
                      onClick={() => {
                        this.setState((state) => ({
                          question1: true,
                        }));
                      }}
                    >
                      NEXT <i className="fas fa-arrow-alt-circle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="time-settings">
                <h3 className="pregame-prompt"> Select time settings:</h3>
                <div className="input-time-div">
                  <button
                    className="input input-time left"
                    style={this.state.styleUntimedButton}
                    onClick={UnTimedClick}
                  >
                    <div>
                      {" "}
                      Untimed Workout{" "}
                      <i
                        className={
                          this.state.timed ? "fas fa-arrow-circle-up" : null
                        }
                      ></i>
                    </div>
                  </button>
                  <button
                    className="input input-time right"
                    style={this.state.styleTimedButton}
                    onClick={TimedClick}
                  >
                    <div>
                      Timed Workout{"  "}
                      <i
                        className={
                          this.state.timed ? null : "fas fa-arrow-circle-down"
                        }
                      ></i>
                    </div>
                  </button>
                </div>
                {this.state.timed ? (
                  <div className="timed-options">
                    <button
                      onClick={() => {
                        this.setState((state) => ({ selectedInterval: "120" }));
                      }}
                      style={
                        this.state.selectedInterval === "120"
                          ? { border: "3px solid rgba(255, 0, 0)" }
                          : { border: "3px solid rgba(0, 0, 0, 0.6)" }
                      }
                      className="input time-intervals left"
                    >
                      EASY: 120sec
                    </button>
                    <button
                      onClick={() => {
                        this.setState((state) => ({ selectedInterval: "90" }));
                      }}
                      style={
                        this.state.selectedInterval === "90"
                          ? { border: "3px solid rgba(255, 0, 0)" }
                          : { border: "3px solid rgba(0, 0, 0, 0.6)" }
                      }
                      className="input time-intervals right"
                    >
                      MODERATE: 90sec
                    </button>
                    <button
                      onClick={() => {
                        this.setState((state) => ({ selectedInterval: "60" }));
                      }}
                      style={
                        this.state.selectedInterval === "60"
                          ? {
                              border: "3px solid rgba(255, 0, 0)",
                            }
                          : {
                              border: "3px solid rgba(0, 0, 0, 0.6)",
                            }
                      }
                      className="input time-intervals left"
                    >
                      HARD: 60sec
                    </button>
                    <button
                      onClick={() => {
                        this.setState((state) => ({ selectedInterval: "30" }));
                      }}
                      style={
                        this.state.selectedInterval === "30"
                          ? { border: "3px solid rgba(255, 0, 0)" }
                          : { border: "3px solid rgba(0, 0, 0, 0.6)" }
                      }
                      className="input time-intervals right"
                    >
                      BEAST: 30sec
                    </button>
                  </div>
                ) : null}
                <div className="button-directions">
                  <button
                    className=" draw-button next-button back"
                    onClick={() => {
                      this.setState((state) => ({ question1: false }));
                    }}
                  >
                    <i class="fas fa-arrow-alt-circle-left"></i> BACK
                  </button>
                  <button
                    disabled={
                      this.state.timed && this.state.selectedInterval === ""
                        ? "disabled"
                        : null
                    }
                    className=" draw-button next-button next"
                    onClick={() => {
                      this.setState((state) => ({ play: true }));
                    }}
                  >
                    NEXT <i class="fas fa-arrow-alt-circle-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="game-content">
            {this.state.play ? (
              !this.state.timed ? (
                <button
                  className="draw-button"
                  style={
                    this.state.play && !this.state.timed
                      ? null
                      : { display: "none" }
                  }
                  disabled={this.state.count === 0 ? "disable" : null}
                  onClick={HandleClick}
                >
                  {" "}
                  {ButtonText()}
                </button>
              ) : (
                <CountdownCircleTimer
                  isPlaying={this.state.startWorkout && this.state.pause}
                  duration={this.state.selectedInterval - 1}
                  onComplete={() => {
                    HandleClick();
                    while (
                      this.state.cards.length != 0
                      // this.state.startWorkout === true
                    ) {
                      return [true, 1000];
                    }
                    return false;
                  }}
                  size={140}
                  colors={[
                    ["#fff", 0.33],
                    ["#F57F65", 0.33],
                    ["#DA3B19", 0.33],
                  ]}
                >
                  <RenderTime />
                </CountdownCircleTimer>
              )
            ) : null}
          </div>
        </div>
        <div className={this.state.userInfoClass}>
          <button className="user-info-button" onClick={userInfoClick}>
            {" "}
            👈{" "}
          </button>
          <p className="user-info-text">
            {this.state.userInfoClass === "user-info-small"
              ? "Click for user information"
              : "your card is" + this.state.card}
          </p>
        </div>
      </div>
    );
  }
}
