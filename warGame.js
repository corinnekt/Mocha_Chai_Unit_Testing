// INSTRUCTIONS
// create an automated version of the card game WAR! 
// 2 players. 
// You do not need to do anything special when there is a tie in a round.
// Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// Four suits to represent the appearance (user interface - ui) for your cards
// let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
// console.log("Card Suits Example:", cardSuits);
 
// The game itself will automatically play using console.log() to display turns, points, cards used, and the outcome of the game. 
// No user input via prompts is required.
 
// The completed project should, when executed, do the following:
// - Deal 26 Cards to each Player from a Deck of 52 cards.
// - Iterate through the turns where each Player plays a Card.
// - The Player who played the higher card is awarded a point.
// - - Ties result in zero points for both Players.
// - After all cards have been played, display the score and declare the winner.

// ----------------------------------------------------------------------------------------------------------

// My plan: start with how to play war
// 1. there are 2 players
// 2. a deck of cards is shuffled
// 3. Each player gets dealt 26 cards from a 52 count deck
// 4. Player 1 lays down a card
// 5. Player 2 lays down a card
// 6. Whichever player has the highest card gets a point
// 7. iterate until all cards are played
// 8. Player with the most points wins

// -----------------------------------------------------------------------------------------------------------

// In ordr to play a card game, we need a deck of cards. Create a deck class that holds the cards and their information (count, suit, rank)
class Deck { 
    constructor () { // basic set up of a class that needs a name, constructor, and constructor properties
        this.deck = [] // the deck holds an array of cards
        this.rank = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'] //
        this.suit = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"]
    }
    createDeck() { // create a function to call the deck into existence with cards and their properties to allow a gmae to be played
       for (let i = 0; i < this.suit.length; i++) { // create deck for the purpose of iterating through each suit
        for (let j = 0; j < this.rank.length; j++) { // within each suit, each ranks is iterated through to differentiate queen of hearts vs queen of spades etc
            let card = { // this information describes a card, which is an object so needs to be inside of curly braces
                name: `${this.rank[j]} of ${this.suit[i]}`, // the name of the card is paired with its value relative to other cards in the deck
                value: j + 1 // cards need to have values to compare. 'j' is used because it described the rank of each card
            }
            this.deck.push(card)
            console.log(card)
            }
        }
    }
    shuffleDeck() { // copied from walkthrough from google
        for (let i = this.deck.length - 1; i > 0; i--) { // for when i is the length of the deck, and while the length of the deck is greater than zero, iterate through each rank
            const j = Math.floor(Math.random() * (i + 1)) // each rank specifies each card - math function performs the randomization
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
        } // within the for loop, the ranks of each suit are iterated through
    }
}

// Game logic - Turn based

class Game { // to play the whole game incorporating the functions established above
    constructor () { // first establish the players
        this.player1 = { // include necessary properties to call in the playGame function when the new deck is established so the computer knows which player has which cards in their hand to determine the score with each turn
            name: 'Player 1',
            score: 0,
            hand: []
        }
        this.player2 = {
            name: 'Player 2',
            score: 0,
            hand: []
        }

    }
    playGame() {
        const deck = new Deck // call the deck class to initiate the functions that will create the deck and then shuffle the deck
        deck.createDeck()
        deck.shuffleDeck()
        console.log(deck.deck) // print the created and shuffled deck
        while (deck.deck.length !== 0) {// perform those methods while cards are in the deck so the deck length does not equal zero
            this.player1.hand.push(deck.deck.shift()) // remove a card with each turn so the game has an end point after 26 turns (so the cards aren't readded to the bottom of the deck)
            this.player2.hand.push(deck.deck.shift())
        } 
        for (let i = 0; i < this.player1.hand.length; i++) { // with each turn, iterate through the player hand and grab a card at random
            if (this.player1.hand[i].value > this.player2.hand[i].value) { // each player has a card randomly chosen from their hand at index [i]. If player 1's card value is greater than player 2's, player one gets the point
                this.player1.score ++
                console.log(`
                    P1 Card: ${this.player1.hand[i].name}
                    P2 Card: ${this.player2.hand[i].name}
                    Player 1 wins a point!
                    Current score: P1 - ${this.player1.score}, P2 - ${this.player2.score}
                    `)
            } else if (this.player2.hand[i].value > this.player1.hand[i].value) { // If player 2's card value is greater than player 1's, player 2 gets the point
                this.player2.score ++
                console.log(`
                    P1 Card: ${this.player1.hand[i].name}
                    P2 Card: ${this.player2.hand[i].name}
                    Player 2 wins a point!
                    Current score: P1 - ${this.player1.score}, P2 - ${this.player2.score}
                    `)
            } else (
                console.log(`
                    P1 Card: ${this.player1.hand[i].name}
                    P2 Card: ${this.player2.hand[i].name}
                    Tie: No points awarded
                    Current score: P1 - ${this.player1.score}, P2 - ${this.player2.score}
                    `) // if neither are greater or less than, they are equal so must be a tie
                )
        } if (this.player1.score > this.player2.score) {
            console.log(`
                Player 1 wins!
                Final Score: P1 = ${this.player1.score}
                             P2 = ${this.player2.score}
                `)
        } else if (this.player2.score > this.player1.score) {
            console.log(`
                Player 2 wins!
                Final Score: P1 = ${this.player1.score}
                             P2 = ${this.player2.score}
                `)
        } else {
            console.log(`
                Tie!
                Final Score: P1 = ${this.player1.score}
                             P2 = ${this.player2.score}
                `)
        }
    } 
}


const game = new Game // creating a new game instance from the pre-establish game class
game.playGame() // instantiating the function
