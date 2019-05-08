import React from 'react';

const HangmanComponent = (props) => {
  const { guessesLeft } = props;
  return (
    <div className="hangman_component">
      <div className="person_component">
        <div>
          <span>{guessesLeft < 6 ? 'O' : ' '}</span>
        </div>
        <div>
          <span>{guessesLeft < 4 ? '\\' : ' '}</span>
          <span>{guessesLeft < 5 ? '|' : ' '}</span>
          <span>{guessesLeft < 3 ? '/' : ' '}</span>
        </div>
        <div>
          <span>{guessesLeft < 2 ? '/' : ' '}</span>
          <span>{guessesLeft < 1 ? '\\' : ' '}</span>
        </div>
      </div>
    </div>
  );
};

export default HangmanComponent;
