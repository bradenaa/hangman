import React from 'react';

import HangmanComponent from '../components/HangmanComponent';
import LettersComponent from '../components/LettersComponent';
import ScoreComponent from '../components/ScoreComponent';

const WORDS = ['cat', 'dog', 'lamp', 'shade', 'goose'];

class HangmanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: '',
      lettersOfWord: [],
      lettersToShow: [],
      guessesLeft: 6,
      lettersUsed: [],
      allLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      message: '',
      gameOver: false,
    };
    this.chooseRandomWord = this.chooseRandomWord.bind(this);
    this.handleLetterGuess = this.handleLetterGuess.bind(this);
  }

  componentDidMount() {
    this.chooseRandomWord();
  }

  // choose a random word
  chooseRandomWord() {
    // find word, and create an array of its letters
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const lettersArr = word.split('');
    // create an array of underscore, the length of the word
    const blankLetterArr = new Array(word.length).fill('_');

    this.setState(prevState => ({
      ...prevState,
      selectedWord: word,
      lettersOfWord: lettersArr,
      lettersToShow: blankLetterArr,
      guessesLeft: 6,
      lettersUsed: [],
      allLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      message: '',
      gameOver: false,
    }));
  }

  // handle a letter guess
  handleLetterGuess(event) {
    const letter = event.target.id;
    const { lettersUsed, lettersOfWord, gameOver } = this.state;
    if (gameOver) return;

    // check if the letter has been used before
    if (lettersUsed.includes(letter)) {
      console.log('letter used... ');
      // update message to show 'letter has been used'
      this.setState(prevState => ({
        ...prevState,
        message: `The letter ${letter} has already been used!`,
      }));
    // if letter is FOUND in selected word
    } else if (lettersOfWord.includes(letter)) {
      console.log('letter found!');
      this.setState((prevState) => {
        // find the indexes of the found letter
        const indexes = lettersOfWord.reduce((acc, l, i) => {
          if (l === letter) {
            acc.push(i);
          }
          return acc;
        }, []);

        // copy the letters to show and set the found index positions
        // to be the letter found
        const newLettersToShow = prevState.lettersToShow.slice();
        indexes.forEach((i) => {
          newLettersToShow[i] = letter;
        });

        // update the letters used
        const newLettersUsed = prevState.lettersUsed.slice();
        newLettersUsed.push(letter);

        return {
          ...prevState,
          lettersToShow: newLettersToShow,
          lettersUsed: newLettersUsed,
          message: `Nice! ${letter} was a correct guess!`,
        };
      });
    // if it isn't in selected word
    } else {
      console.log('wrong guess');
      this.setState((prevState) => {
        // check if we are out of guesses, force a game over if so!
        if (prevState.guessesLeft === 1) {
          return {
            ...prevState,
            guessesLeft: prevState.guessesLeft - 1,
            message: `Sorry! ${letter} was an incorrect guess. You are out of guesses! Please play again!`,
            gameOver: true,
          };
        }
        // update letters to show
        const newLettersUsed = prevState.lettersUsed.slice();
        newLettersUsed.push(letter);
        return {
          ...prevState,
          // decrease the guesses
          guessesLeft: prevState.guessesLeft - 1,
          // update letters used
          lettersUsed: newLettersUsed,
          // change the message 'No matching letter!'
          message: `Sorry! ${letter} was an incorrect guess. Try again!`,
        };
      });
    }
  }

  render() {
    const { lettersUsed, guessesLeft, lettersToShow, allLetters, message, gameOver } = this.state;

    return (
      <div id="main_container">

        <HangmanComponent
          guessesLeft={guessesLeft}
        />

        <LettersComponent
          allLetters={allLetters}
          handleLetterGuess={this.handleLetterGuess}
          lettersUsed={lettersUsed}
        />

        <ScoreComponent
          guessesLeft={guessesLeft}
          lettersToShow={lettersToShow}
          message={message}
          restartGame={this.chooseRandomWord}
          gameOver={gameOver}
        />
      </div>
    );
  }
}

export default HangmanContainer;
