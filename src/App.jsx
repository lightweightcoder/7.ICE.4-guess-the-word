import React, { useState } from 'react';

const completedFigure = '(凸ಠ益ಠ)凸';

export default function App() {
  const SECRET_WORD = 'banana';
  const SECRET_WORD_ARRAY = [...SECRET_WORD];
  const [letter, setLetter] = useState('');
  const [guessedSecretWord, setGuessedSecretWord] = useState(['_', '_', '_', '_', '_', '_']);
  let hasACorrectGuess = false;
  const [currentFigure, setCurrentFigure] = useState('');
  const [numOfWrongGuesses, setNumOfWrongGuesses] = useState(0);

  // create a span for each letter of the secret word
  const SECRET_WORD_SPANS = guessedSecretWord.map((secretWordLetter, index) => (
    <span key={index}>
      {secretWordLetter}
      ,
    </span>
  ));

  const handleLetterChange = (event) => {
    // if number of wrong guess is 7, end the game and display end game msg
    if (numOfWrongGuesses === 7) {
      console.log('reach 7 guesses');
      window.location = '/home';
    } else {
      const newLetter = event.target.value;

      const lowerCaseNewLetter = newLetter.toLowerCase();

      // validation that letter is alphabetical and only 1 letter
      if (lowerCaseNewLetter === '' || lowerCaseNewLetter.match(/^[a-z]$/)) {
        setLetter(lowerCaseNewLetter);
        console.log('letter', letter);

        // validate if the letter belongs to the secret word
        SECRET_WORD_ARRAY.forEach((secretWordLetter, index) => {
          if (secretWordLetter === lowerCaseNewLetter) {
            guessedSecretWord[index] = lowerCaseNewLetter;

            setGuessedSecretWord(guessedSecretWord);

            hasACorrectGuess = true;
            console.log('hasACorrectGuess', hasACorrectGuess);
          }
        });
      }

      console.log('hasACorrectGuess', hasACorrectGuess);
      // if a user has guessed a letter incorrectly and the user did not press backspace
      // add a symbol of the figure
      if (hasACorrectGuess === false && lowerCaseNewLetter !== '') {
        const newCurrentFigure = `${currentFigure}${completedFigure.charAt(numOfWrongGuesses)}`;
        console.log('numOfWrongGuesses', numOfWrongGuesses);
        console.log(newCurrentFigure);
        // update the state of the current figure
        setCurrentFigure(newCurrentFigure);

        // increment the number of wrong guesses by 1
        setNumOfWrongGuesses(numOfWrongGuesses + 1);
      }
    }
  };

  function ControlledForm() {
    return (
      <div>
        <input value={letter} onChange={handleLetterChange} />
        <h5>guessed letters</h5>
        <p>{SECRET_WORD_SPANS}</p>
        <p>{`figure: ${currentFigure}`}</p>
      </div>
    );
  }

  return (
    <div>
      <ControlledForm />
    </div>
  );
}
