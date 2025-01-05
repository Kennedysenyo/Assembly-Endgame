
export default function NewGameButton(props) {
  return(
    <button onClick={() => props.resetGame()} className="new-game">New Game</button>
  )
}