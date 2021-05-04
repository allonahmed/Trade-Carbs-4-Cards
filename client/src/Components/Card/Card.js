import React, { Component } from "react";
import "./Card.css";
import { randomNumber } from "../../helpers";
import { AnimateKeyframes } from "react-simple-animate";


const increment = (x) => {
  return x + 2;
}
let x = 10;
class Card extends Component {
    constructor(props) {
      super(props);
      this._translateX = `${randomNumber(0, 30, 1)}px`;
      this._translateY = `${randomNumber(0, 30, 1)}px`;
      this._rotation = `${randomNumber(-10, 10, 1)}deg`;
      this._style = {
        transform: `translate(${this._translateX},${this._translateY} ) rotate(${
          this._rotation
        })`
      // this._translateX = `${increment(x+10)}px`;
      // this._style = {
      //   transform: `translate(${this._translateX})`
      // }
      };
    }
    

    render() {
        return (
          <AnimateKeyframes
            play={true}
            duration={0.6}
            easeType="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            keyframes={[
              `transform: translateZ(700px) translateY(300px)`,
              `transform: translateZ(0) translateY(${this._translateY}px)`
            ]}
          >

              <div className='card' style={{ ...this._style }} data-value={this.props.cardData}>{this.props.symbol}</div>

        </AnimateKeyframes>
        );
      }
    }
    
export default Card;