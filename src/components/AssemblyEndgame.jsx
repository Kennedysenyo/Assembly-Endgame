import { useState } from "react"
import { languages } from "../languages"
import LanguageChip from "./LanguageChip"
import LetterBox from "./LetterBox";
import KeyboardKey from "./KeyboardKey";
import NewGameButton from "./NewGameButton";

const AssemblyEndgame = () => {

  const [currentWord, setCurrentWord] = useState("react".split(""));
  const [guessedLetters, setGuessedLetters] = useState([])
  const [alphabet, setAlphabet] = useState(() => setKeyboardKeys())
  

  const wrongGuessedCount = guessedLetters.filter( 
    letter => !currentWord.includes(letter)).length;
  console.log(wrongGuessedCount)
    

  // Generates an array of keyboard keys object.
  function setKeyboardKeys() {
    const alph = "abcdefghijklmnopqrstuvwxyz";
    return alph.split("").map((letter, index) => ({ id: index+1, letter: letter, state: ""}))
  }
  
  // Takes a letter arguement and updates state of alphabet and guessedLetters.
  function addGuessedLetter(newLetter) {
    if (guessedLetters.includes(newLetter)) return

    setGuessedLetters( prevLetters => ([...prevLetters, newLetter]) ) 

    setAlphabet( prevAlphabet => prevAlphabet.map( 
      letter => letter.letter === newLetter ? 
      (currentWord.includes(newLetter) 
      ? {...letter, state: "correct"} 
      : {...letter, state: "incorrect"}) : 
      letter
    ))    
    
  }
  
  
  
  
  // Renders the Programming Languages 
  const langChips = languages.map( lang => 
    <LanguageChip 
      key={lang.name}
      language={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor} 
    /> 
  );

  // Renders correctly guessed words
  const letterBox = currentWord.map((letter, index) => 
    <LetterBox 
      key={index+1} 
      letter={guessedLetters.includes(letter) ? letter : ""} 
    />
  );

  // Renders the Keyboard 
  const keyboardElements = alphabet.map( key => 
    <KeyboardKey 
      key={key.id} 
      keyButton={key.letter} 
      state={key.state}
      getKey={addGuessedLetter}
    />
  )

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </section>
      <section className="language-chips">
        {langChips}
      </section>
      <section className="word">
        {letterBox}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      <NewGameButton />
    </main>
  )
}

export default AssemblyEndgame;