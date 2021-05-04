import './Deck.css'

export default class Deck{
    constructor() { // generates an array filled with all possible cards
        this.deck = [];   
        const suits = ['♦', '♣', '♠', '♥'];
        const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(`${values[value]}${suits[suit]}`);
            }
        }
    }

    shuffle = (deck) => { // shuffles the deck
        let current = deck.length, temp, rand;
        while (current !== 0)
        {
            rand = Math.floor(Math.random()*current);
            current -= 1;
            //swap random index with current index

            temp = deck[current];
            deck[current] = deck[rand];
            deck[rand] = temp;
        }
        return deck;
    }

    //remove from deck goes here:

    //
}



