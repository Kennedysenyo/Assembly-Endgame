
const GameStatus = (props) => {
  return (
    <>
      <h2>{props.status}</h2>
      <p>{props.details}</p>
    </>
  )
}

export default GameStatus;