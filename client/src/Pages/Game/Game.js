import React from "react";
import "../../App.css";
import "./Game.css";
import { Component } from "react";
import Card from "../../Components/Card/Card";
import Deck from "../../Components/Deck/Deck";
import FaceDown from "../../Components/Card/FaceDown";
import SignUpPage from "../SignUp/SignUpPage";

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
      selectedTime: "",
      selectedExercise: "",
      styleTimedButton: { height: "10rem", color: "black" },
      styleUntimedButton: {
        background: "#fde9e2",
        height: "10rem",
        color: "black",
      },
      enhance: false,
      selectedInterval: "",
      countDown: "false",
      userInfoClass: "user-info",
      question1: false, // if false, show question of exersize, else go to question2
      question2: false, // if false, show question of time, else set play to true
      play: false,
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
  intervalChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedInterval: e.target.value,
    });
  };
  render() {
    const HandleClick = () => {
      // decriments the count after each click
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
          selectedInterval: (state.selectedInterval = ""),
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

    const cardList = this.state.drawnCards.map(
      (
        cardV,
        index // returns an array of all the drawnCards (using map), then placing each element in the array in the Card component
      ) => (
        <Card
          key={index} //error handling
          cardData={cardV}
          symbol={cardV.length === 2 ? cardV[1] : cardV[2]}
          suit={cardV[cardV.length - 1]}
          value={cardV.length === 3 ? 10 : cardV[0]}
        />
      )
    );
    const faceDown = this.state.cards.map((val, i) => (
      <FaceDown classs="face-down" key={i} />
    ));
    console.log(this.state.cards.length);

    return (
      <div className="container">
        <div
          className="game-container"
          style={this.state.enhance ? { width: "100%", height: "100vh" } : null}
        >
          {/* <button onClick={() => this.setState((state) => ({ enhance: true }))}>
            enhance
          </button> */}
          <div className="deck-spot">
            {this.state.play === true ? ( // only renders the cardList if the count is under 52, which will occur when you click the button after the first time
              <div className="two-decks">
                <div className="face-down-div">{faceDown}</div>
                <div className="card-list-spot">{cardList}</div>
              </div>
            ) : this.state.question1 === false ? (
              <div className="pre-game">
                <div className="workout-settings">
                  <h3 className="pregame-prompt">Select a workout: </h3>
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
                    <button className="input time-intervals left">
                      EASY: 120sec
                    </button>
                    <button className="input time-intervals right">
                      MODERATE: 90sec
                    </button>
                    <button className="input time-intervals left">
                      HARD: 60sec
                    </button>
                    <button className="input time-intervals right">
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
          <button
            className="draw-button"
            style={this.state.play ? null : { display: "none" }}
            onClick={HandleClick}
          >
            {" "}
            {ButtonText()}
          </button>
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
