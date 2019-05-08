import React from 'react';

const ScoreComponent = (props) => {
  const { guessesLeft, lettersToShow, message, restartGame, gameOver } = props;
  const letters = lettersToShow.map((letter, i) => {
    return (
      <span>{`${letter}      `}</span>
    );
  });
  return (
    <div className="score_component">
      <div>{`Number of Guesses Left: ${guessesLeft}`}</div>
      <br />
      <div>{letters}</div>
      <br />
      <div>{message}</div>
      <br />
      <br />
      { gameOver && (
        <button type="button" onClick={restartGame}>Play Again!</button>
      )}
    </div>
  );
};

export default ScoreComponent;
