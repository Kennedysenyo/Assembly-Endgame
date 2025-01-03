import React from "react"
import { languages } from "../languages"
import LanguageChip from "./LanguageChip"

export default function AssemblyEndgame() {

  const chips = languages.map( lang => 
    <LanguageChip 
      key={lang.name}
      language={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor} 
    /> 
  )

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </section>
      <section className="language-chips">
        {chips}
      </section>
    </main>
  )
}