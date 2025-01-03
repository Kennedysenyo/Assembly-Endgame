

export default function Chip(props) {

  const styles = {
    color: props.color,
    backgroundColor: props.backgroundColor
  }

  return (
    <span style={styles}>
      {props.language}
    </span>
  )
}