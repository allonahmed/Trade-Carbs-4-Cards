import React from 'react'
import '../../App.css'
import './Game.css'
import { Component } from 'react'
import Card from '../../Components/Card/Card'
import Deck from '../../Components/Deck/Deck'
import SignUpPage from '../SignUp/SignUpPage'


export default class Game extends Component{
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
          card: '', // single card from deck array
          shuffled: deck1.shuffle(deck1.deck), //shuffled array of the deck
          play:false,
          gameContainerClass: 'game-container',
          selectedTime:'',
          selectedExercise:'',
          selectedInterval: '',
          countDown:'false',
          userInfoClass: 'user-info',
        };
        this.drawNewCard = this.drawNewCard.bind(this);
        this.timeChange = this.timeChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        
    }
    drawNewCard() { // adds the cards already drawn 
        return this.setState(prevState => ({
          drawnCards: [
            ...prevState.drawnCards,
            prevState.cards[prevState.cards.length - 1]
          ],
          cards: [...prevState.cards.slice(0, -1)]
        }));
      }
    timeChange = (e) => {
        e.preventDefault();
        this.setState({
            selectedTime: e.target.value,
        })
        if (this.state.selectedTime === 'untimed')
        {
            this.setState(state=>({
                selectedInterval: state.selectedInterval = '',
            }))
        }
    }
    exerciseChange = (e) => {
        e.preventDefault();
        this.setState({
            selectedExercise: e.target.value,
        })
    }

    intervalChange = (e) => {
        e.preventDefault();
        this.setState({
            selectedInterval: e.target.value,
        })
    }


    render(){

        // const StartClick = () => {
        //     if (this.state.count === 52 ){
        //         console.log(this.state.shuffled);
        //         console.log(this.state.selectedTime);
        //         console.log(this.state.selectedInterval);
        //         console.log(this.state.selectedExercise);
        //     }
        //     this.setState(state =>({
        //         countDown: state.countDown = true,
        //     }))
        //     HandleClick();
        // }

        const HandleClick = () => { // decriments the count after each click
            this.setState(state =>({
                card: state.card = state.cards[state.count-1], // sets the current card to the last element in the shuffled cards deck
                count: state.count -1, // decriments the count for ux and to keep moving through the cards deck
                index: state.index +1, // increment the index
            }));
            this.drawNewCard(); // calls the draw new card function
            console.log(this.state.drawnCards[this.state.index-1]) // for testing, shows current card being drawn
            // if (this.state.)
            if (this.state.selectedTime === 'untimed')
            {
                this.setState(state=>({
                    selectedInterval: state.selectedInterval = '',
                }))
                
                
            }     
        }

        const ButtonText = () => { // button text after each click
            let results;
            if (this.state.count === 52) results = "Start Your Workout!"
            else if (this.state.count > 1) results = this.state.count + ' cards left';
            else if (this.state.count === 1) results =  '1 card left';
            else if (this.state.count === 0) results = 'Finished. 0 cards left'; 
            return results;
        }

        const DisableButton = () => {
            if (this.state.count === 0)
            {
                return true;
            }
            if (this.state.selectedTime === 'untimed' && this.state.selectedExercise !== '')
            {
                return false;
            }
            else if (this.state.selectedExercise === '' || this.state.selectedTime === ''  || this.state.selectedInterval === '')
            {
                return true;
            }
            else return false;
        }

        const userInfoClick = () => {
            if( this.state.userInfoClass === 'user-info')
                this.setState(state=>({
                    userInfoClick: state.userInfoClass = 'user-info-small'
                }))
            else 
                this.setState(state => ({
                    userInfoClick: state.userInfoClass = 'user-info'
                }))
        }
   


        const cardList = this.state.drawnCards.map((cardV,index) => ( // returns an array of all the drawnCards (using map), then placing each element in the array in the Card component
            <Card 
                key={index} //error handling
                cardData={cardV} 
                symbol={cardV.length===2 ? cardV[1] : cardV[2]} 
                suit={cardV[cardV.length-1]} 
                value={cardV.length===3 ? 10 : cardV[0]}
            />
        ))

        return (
            <div className='container' >
                <div className='game-container'> 
                    <div className='deck-spot' >
                        {this.state.count < 52 // only renders the cardList if the count is under 52, which will occur when you click the button after the first time
                        ? 
                            <div className='card-list-spot'>
                                    {cardList} 
                                {/* <div className='card-info'>You drew the {this.state.card[0]} of {this.state.card[1]}!</div> */}
                            </div>
                        : 
                            <div className= 'pre-game'>
                                    <div className='input-div'>
                                        <h3> Which exercises do you want to do in this workout? (you can choose as many as you wish)</h3>
                                        <input  type='radio' value='Push-ups' name='exercise' checked={this.state.selectedExercise === 'Push-ups'} 
                                        onChange={this.exerciseChange}/> Push-ups
                                        <input  type='radio' value='Sit-ups' name='exercise' checked={this.state.selectedExercise === 'Sit-ups'} 
                                        onChange={this.exerciseChange}/> Sit-ups
                                        <input  type='radio' value='Jumping Jacks' name='exercise' checked={this.state.selectedExercise === 'Jumping Jacks'} 
                                        onChange={this.exerciseChange}/> Jumping Jacks
                                        <input  type='radio' value='Planks' name='exercise' checked={this.state.selectedExercise === 'Planks'} 
                                        onChange={this.exerciseChange}/> Planks
                                    </div>
                                  
                                    <div className='input-div'>
                                        <h3>Would you like a timed, or untimed workout?</h3>
                                        <input  type='radio' value='timed' name='timer' checked={this.state.selectedTime === 'timed'} 
                                        onChange={this.timeChange}/> timed
                                        <input type='radio' value='untimed' name='timer' checked={this.state.selectedTime === 'untimed' && this.state.selectedInterval===''} 
                                        onChange={this.timeChange}/> untimed
                                    </div>
                                    {this.state.selectedTime === 'timed' 
                                     ?
                                    
                                    <div className='input-div'>
                                        <h3>What time intervals would you like to attempt?</h3>
                                        <input  type='radio' value='5 Minutes' name='interval' checked={this.state.selectedExercise === '5 Minutes'} 
                                        onChange={this.intervalChange}/> 5 Minutes
                                        <input  type='radio' value='3 Minutes' name='interval' checked={this.state.selectedExercise === '3 Minutes'} 
                                        onChange={this.intervalChange}/> 3 Minutes
                                        <input  type='radio' value='2 Minutes' name='interval' checked={this.state.selectedExercise === '2 Minutes'} 
                                        onChange={this.intervalChange}/> 2 Minutes
                                        <input  type='radio' value='1 Minutes' name='interval' checked={this.state.selectedExercise === '1 Minutes'} 
                                        onChange={this.intervalChange}/> 1 Minutes
                                        <input  type='radio' value='30 Seconds' name='interval' checked={this.state.selectedExercise === '30 Seconds'} 
                                        onChange={this.intervalChange}/> 30 Seconds  
                                    </div>
                                     :
                                        null
                                    }



                            </div>
                            }
                    </div>
                    

                    
                    <button className='draw-button' disabled={DisableButton()} onClick={HandleClick}> {ButtonText()}</button>
                </div>
                
                <div className={this.state.userInfoClass}>
                    <button onClick={userInfoClick}> 👈 </button>
                    <p>yoiur card is {this.state.card}</p>
                </div>
            </div>  
        );
    };
}


