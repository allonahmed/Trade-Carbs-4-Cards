import React, { Component } from "react";
import "./Card.css";
import { randomNumber } from "../../helpers";
import { AnimateKeyframes } from "react-simple-animate";
import Yugioh from "../../Media/yugioh.jpeg";

let count = 0.2;
class FaceDown extends Component {
  // this is the card component. Each element in the array will be converted into it's own Card element

  constructor(props) {
    super(props);
    //properties to add some randomness to the way the card element is displayed
    this._translateX = `${(count += 0.6)}px`;
    this._translateY = `${randomNumber(-3, 3, 1)}px`;
    this._rotation = `${randomNumber(-2, 2, 1)}deg`;
    this._style = {
      transform: `translate(${this._translateX},${this._translateY} ) rotate(${this._rotation})`,
    };
  }

  render() {
    return (
      <div className={this.props.classs} style={{ ...this._style }}>
        <img style={{ minWidth: "250px", minHeight: "340px" }} src={Yugioh} />
      </div>
    );
  }
}

export default FaceDown;
