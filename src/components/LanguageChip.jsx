import clsx from "clsx"

export default function LanguageChip(props) {

  const styles = {
    color: props.color,
    backgroundColor: props.backgroundColor
  }

  const className = clsx({
    lost: props.isLost
  })

  return (
    <span className={className} style={styles}>
      {props.language}
    </span>
  )
}