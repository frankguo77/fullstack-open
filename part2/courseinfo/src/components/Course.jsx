
function Header(props) {
  console.info('Header:',props)
  return (
  <>
    <h1>{props.name}</h1>
  </>
  )
}

function Part(props) {
  console.log('Part:',props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

function Content(props) {
  console.log('Content:', props)
  return (
  <>
    {props.parts.map(part => <Part part = {part} />)}
  </>
  )
}

function Total(props) {
  const a = props.parts.reduce((s, p) => s + p.exercises, 0)
  console.info(a)
  return (
  <>
    <h3>total of {a} exercises</h3>
  </>
  )
}

function Course(props) {
    console.log('Course:', props)
    return (
        <div>
            <Header  name = {props.course.name} />
            <Content parts = {props.course.parts} />
            <Total   parts = {props.course.parts} />
        </div>
    )
}

export default Course