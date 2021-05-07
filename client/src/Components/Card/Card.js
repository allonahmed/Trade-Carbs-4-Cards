import React, { Component } from "react";
import "./Card.css";
import { randomNumber } from "../../helpers";
import { AnimateKeyframes } from "react-simple-animate";


class Card extends Component { // this is the card component. Each element in the array will be converted into it's own Card element
    constructor(props) {
      super(props); 
      //properties to add some randomness to the way the card element is displayed
      this._translateX = `${randomNumber(0, 30, 1)}px`;
      this._translateY = `${randomNumber(0, 30, 1)}px`;
      this._rotation = `${randomNumber(-10, 10, 1)}deg`;
      this._style = {
        transform: `translate(${this._translateX},${this._translateY} ) rotate(${
          this._rotation
        })`
      };
    }
    
    render() {
      const ColorChange = () => {
        let style = 'card';
        if (this.props.cardData[this.props.cardData.length-1] === '♦' || this.props.cardData[this.props.cardData.length-1] === '♥')
        {
          style += ' red';
        }
        else 
        {
          style += ' black'
        }
        return style;
      }
        return (
          <AnimateKeyframes // special react styling framework to add clean fade in animations 
            play={true}
            duration={0.6}
            easeType="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            keyframes={[
              `transform: translateX(0px) translateY(-400px)`,
              `transform: translateX(0) translateY(${this._translateY}px)`
            ]}
          >
            <div className={ColorChange()} style={{ ...this._style }} data-value={this.props.cardData}>{this.props.symbol}</div>
        </AnimateKeyframes>
        );
      }
    }
    
export default Card;