import clsx from "clsx"

export default function LetterBox(props) {
  const className = clsx("letter", {reveal: props.isGameLost })

  return(
    <span className={className}>{props.letter}</span>
  )
}