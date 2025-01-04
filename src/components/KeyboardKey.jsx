import clsx from "clsx";

 const KeyboardKey = (props) => {

  return(
    <button 
      className={clsx(props.state)}
      onClick={() => props.getKey(props.keyButton)}
    >
      {props.keyButton}
    </button>
  )
}

export default KeyboardKey;