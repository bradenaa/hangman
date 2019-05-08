import React from 'react';

const LettersComponent = (props) => {
  const { allLetters, handleLetterGuess, lettersUsed } = props;
  const letterButtons = allLetters.map((letter, i) => {
    const key = letter + i.toString();
    const usedLetter = lettersUsed.includes(letter);
    const color = usedLetter ? 'red' : 'black';
    return (
      <button
        id={letter}
        key={key}
        onClick={handleLetterGuess}
        type="button"
        className="letter_button"
        style={{ color }}
      >
        {letter}
      </button>
    )
  });

  return (
    <div className="letters_component">
      {letterButtons}
    </div>
  );
};

export default LettersComponent;
