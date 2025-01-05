import clsx from "clsx";

 const KeyboardKey = (props) => {

  return(
    <button 
      className={clsx(props.state)}
      onClick={() => props.getKey(props.keyButton)}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
      aria-disabled={props.ariaDisabled}
    >
      {props.keyButton}
    </button>
  )
}

export default KeyboardKey;