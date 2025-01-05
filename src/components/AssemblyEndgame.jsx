import { useEffect, useState } from "react";
import { languages } from "../languages";
import LanguageChip from "./LanguageChip";
import LetterBox from "./LetterBox";
import KeyboardKey from "./KeyboardKey";
import NewGameButton from "./NewGameButton";
import GameStatus from "./GameStatus";
import clsx from "clsx";
import { getFarewellText } from "../utils";
import { words } from "../words";

const AssemblyEndgame = () => {
  const [currentWord, setCurrentWord] = useState(() => getSecretWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [alphabet, setAlphabet] = useState(() => setKeyboardKeys());
  const [status, setStatus] = useState({
    status: "",
    details: ""
  });
  const [prevWrongGuessedCount, setPrevWrongGuessedCount] = useState(0);
  const [lastGuessFeedback, setLastGuessFeedback] = useState("");

  function getSecretWord() {
    return words[Math.floor(Math.random() * words.length)].split("")
  }

  const wrongGuessedCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon =
    new Set(currentWord).size ===
    guessedLetters.filter((letter) => currentWord.includes(letter)).length;

  const isGameLost = wrongGuessedCount === 8;
  const isGameOver = isGameWon || isGameLost;

  useEffect(() => {
    if (isGameWon) {
      setStatus({
        status: "You Win!",
        details: "Well done!🎉"
      });
    } else if (isGameLost) {
      setStatus({
        status: "Game Over!",
        details: "You lose! Better start learning Assembly 😭"
      });
      
    } else if (wrongGuessedCount > prevWrongGuessedCount) {
      
      const farewellText = getFarewellText(
        languages[wrongGuessedCount - 1].name
      );

      setStatus( {
        status: "Oooops!",
        details: `${farewellText} 😢`
      });
      
    } 

    setPrevWrongGuessedCount(wrongGuessedCount); 
  }, [isGameWon, isGameLost, wrongGuessedCount]);


  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const numGuessesLeft = (languages.length-1) - wrongGuessedCount

  useEffect(() => {
    if (guessedLetters.length > 0) {
      
      if (!currentWord.includes(lastGuessedLetter)) {
        setLastGuessFeedback("wrong"); 
      } else {
        setLastGuessFeedback("correct"); 
      }
    }
  }, [guessedLetters]); 
  

  // Generates an array of keyboard keys object.
  function setKeyboardKeys() {
    const alph = "abcdefghijklmnopqrstuvwxyz";
    return alph.split("").map((letter, index) => ({
      id: index + 1,
      letter: letter,
      state: "",
    }));
  }

  // Takes a letter argument and updates state of alphabet and guessedLetters.
  function addGuessedLetter(newLetter) {
    if (guessedLetters.includes(newLetter) || isGameOver) return;

    setGuessedLetters((prevLetters) => [...prevLetters, newLetter]);

    setAlphabet((prevAlphabet) =>
      prevAlphabet.map((letter) =>
        letter.letter === newLetter
          ? currentWord.includes(newLetter)
            ? { ...letter, state: "correct" }
            : { ...letter, state: "incorrect" }
          : letter
      )
    );

    // Check if the guessed letter is correct and update the status
    if (currentWord.includes(newLetter)) {
      setStatus({
        status: "Well done!",
        details: "Keep going! Save the world 🌎"
      });
    }
  }

  // Renders the Programming Languages
  const langChips = languages.map((lang, index) => (
    <LanguageChip
      key={lang.name}
      language={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor}
      isLost={index < wrongGuessedCount}
    />
  ));

  // Renders correctly guessed words
  const letterBox = currentWord.map((letter, index) => (
    <LetterBox
      key={index + 1}
      letter={guessedLetters.includes(letter) ? letter : ""}
    />
  ));

  // Renders the Keyboard
  const keyboardElements = alphabet.map((key) => (
    <KeyboardKey
      key={key.id}
      disabled={isGameOver}
      ariaDisabled={guessedLetters.includes(key)}
      ariaLabel={`Letter ${key}`}
      keyButton={key.letter}
      state={key.state}
      getKey={addGuessedLetter}
    />
  ));

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    rightGuess: lastGuessFeedback === "correct" && !isGameOver,
    wrongGuess: lastGuessFeedback === "wrong" && !isGameOver,
  });
  

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        <GameStatus status={status.status} details={status.details} />
      </section>
      <section className="language-chips">{langChips}</section>
      <section className="word">{letterBox}</section>

    {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">

        <p>
          {
          currentWord.includes(lastGuessedLetter)
          ? `Correct! The letter ${lastGuessedLetter} is in the word`
          : `Sorry, the letter ${lastGuessedLetter} is not in the word.` 
          }
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word: {currentWord.map( letter => 
          guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}
        </p>

      </section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && <NewGameButton />}
    </main>
  );
};

export default AssemblyEndgame;
