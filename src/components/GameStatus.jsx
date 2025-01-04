
const GameStatus = (props) => {
  return (
    <>
      <h2>{props.status}</h2>
      <p>{props.details ? props.details : null}</p>
    </>
  )
}

export default GameStatus;