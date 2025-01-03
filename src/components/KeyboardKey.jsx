

export default function KeyboardKey(props) {
  return(
    <button onClick={() => props.getKey(props.keyButton)}>{props.keyButton}</button>
  )
}