import { useState } from "react"
import { languages } from "../languages"
import LanguageChip from "./LanguageChip"
import LetterBox from "./LetterBox";
import KeyboardKey from "./KeyboardKey";

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState("react");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const langChips = languages.map( lang => 
    <LanguageChip 
      key={lang.name}
      language={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor} 
    /> 
  );

  const letterBox = currentWord.split("").map((letter, index) => 
    <LetterBox 
      key={index+1} 
      letter={letter} 
    />
  );

  const keyboardElements = alphabet.split("").map( key => 
    <KeyboardKey 
      key={key} 
      keyButton={key} 
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
    </main>
  )
}