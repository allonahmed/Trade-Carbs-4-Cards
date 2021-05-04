import React from 'react'
import './Home.css'
import '../../App.css'
import { Component } from 'react'
import Card from '../../Components/Card/Card'
import Deck from '../../Components/Deck/Deck'
import TextLoop from "react-text-loop";



export default class HomePage extends Component{
    constructor(props) {
        super(props);
        const deck1 = new Deck(); // creating Deck object
        this.state = {
          login: false,
          guest: false,
          cards: deck1.deck, // initializes the deck of cards
          drawnCards: [],
          totalReps:0,
          index: 0,
          count: 52, // keeps tract of times button is clicked
          card: '', // single card from deck array
          shuffled: deck1.shuffle(deck1.deck), //shuffled array of the deck
          isFlipped: false,
          play:false,
          playMouseOver: null,
          introText: "Welcome To Trade Carbs 4 Cards! Press play to start your grind!",
          classInnerText: "span",
          homeButton: "home-button",
        };
        this.drawNewCard = this.drawNewCard.bind(this);
        
    }
    drawNewCard() {
        return this.setState(prevState => ({
          drawnCards: [
            ...prevState.drawnCards,
            prevState.cards[prevState.cards.length - 1]
          ],
          cards: [...prevState.cards.slice(0, -1)]
        }));
      }

    render(){
        // const Card = (props) => { // returns the actual card to be displayed
        //     return (
        //             <div className='card-div'>
        //                 <div className={colorChange()} data-value={props.cardData}>{props.symbol}</div>
        //             </div>
        //     )
        // }
        const HandleClick = () => { // decriments the count after each click
            this.setState(state =>({
                card: state.card = state.cards[state.count-1],
                count: state.count -1,
                // cards: state.cards = deck1.deck,
                // shuffled: state.shuffled = deck1.shuffle(deck1.deck),
                
                index: state.index +1,
            }));
            this.setState(prevState => ({ 
                isFlipped: !prevState.isFlipped ,
            }));
            this.drawNewCard();

            
            if (this.state.count === 52 )
            console.log(this.state.shuffled);
        }
        const GuestClick = () => {
            this.setState(state => ({
                guest: state.guest = true,
            }));
        }
        // const PlayGame = () => {
        //     this.setState(state =>({
        //         play: state.play = true,
        //     }));
        // }
        const ButtonText = () => { // button text after each click
            let results;
            if (this.state.count > 1) results = this.state.count + ' cards left';
            else if (this.state.count === 1) results =  '1 card left';
            else if (this.state.count === 0) results = 'Finished. 0 cards left'; 
            return results;
        }
        // const colorChange = () => { // changes color of card based on the suit
        //     let classList = '';
        //     if (this.state.card[this.state.card.length-1]==='♦' || this.state.card[this.state.card.length-1]==='♥')
        //     {
        //         classList = 'card red';
        //     }
        //     else {
        //         classList = 'card black';
        //     }
        //     return classList;
        // }
        const preGame = () => {
            let classL = '';
            if (this.state.guest === true){
                classL = 'pregame none'
            }
            else {
                classL = 'pregame'
            }
            return classL;
        }
        const PrePlay = () => {
            let classLL = 'pre-play-div';
            if (this.state.playMouseOver === true)
            {
                classLL += ' wallpaper-edit';
            }
            else if (this.state.playMouseOver === false){
                classLL = 'pre-play-div';
            }
            if (this.state.play === true)
            {
                classLL = ' none'
            }
            return classLL;
        }
        const GradientOut = () =>{
            this.setState(state =>({
                playMouseOver: state.playMouseOver = true,
                classInnerText: state.classInnerText = "span span-hover"
            }))
            console.log(this.state.playMouseOver);
        }
        const GradientIn = () =>{
            this.setState(state =>({
                playMouseOver: state.playMouseOver = false,
            }))
            console.log(this.state.playMouseOver);
        }

        const cardList = this.state.drawnCards.map((cardV,index) => (
            // <li className='card' key={index}>{cardV} </li>
            <Card key={index}
            cardData={cardV} 
            symbol={cardV.length===2 ? cardV[1] : cardV[2]} 
            suit={cardV[cardV.length-1]} 
            value={cardV.length===3 ? 10 : cardV[0]}/>
        ))
        return (
            <div className='container' >
                <div className={preGame()}>
                    <div className={PrePlay()} >
                        <div className='intro-text'>
                            <TextLoop className= 'adjectives'interval={1000}mask={true} >
                                <span className={this.state.classInnerText}>Healthy</span>
                                <span className={this.state.classInnerText}>Fast</span>
                                <span className={this.state.classInnerText}>Simple</span>
                                <span className={this.state.classInnerText}>FREE</span>
                            </TextLoop>
                            <span className='innerText text'>Trade Carbs 4 Cards</span>
                            <span className={this.state.classInnerText}>Play Now</span>
                        </div>
                            {/* onMouseOver={GradientOut} onMouseLeave={GradientIn} */}
                            <div className='home-button-div'>
                                
                                <button className={this.state.homeButton} onMouseOver={GradientOut} onMouseLeave={GradientIn}><a href='/login'>Login with C4C</a></button>
                                <button className={this.state.homeButton} onMouseOver={GradientOut} onMouseLeave={GradientIn} onClick={GuestClick}> Play as Guest</button>
                            </div>
                    </div>
                    {this.state.play===true ?
                        <div >
                            <div className='textarea'>hello world i am allon</div>
                            <button className = "pregame-button" onClick={GuestClick}>play as guest?</button>
                            <button className = "pregame-button"><a href='/login'>Sign In/Up</a></button>
                        </div>
                    : null}
                    
                </div> 
                {  this.state.guest===true ?
                    <div className='game-container'>
                        <button className='draw-button' disabled={this.state.count===0} onClick={HandleClick}> {ButtonText()}</button>
                        <div className='deck-spot' >
                            {this.state.count < 52 ? 
                            <div>
   
                                    {cardList} 

                                {/* <div className='card-info'>You drew the {this.state.card[0]} of {this.state.card[1]}!</div> */}
                            </div>
                            : ''}
                        </div>
                    </div>
                    : " "}
            </div>  
        );
    };
}


