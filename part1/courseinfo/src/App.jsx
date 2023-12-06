function Header(props) {
  console.info(props.course)
  return (
  <>
    <h1>{props.course}</h1>
  </>
  )
}

function Part(props) {
  console.log(props)
  return (
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

function Content(props) {
  return (
  <>
    <Part part = {props.part[0]} />
    <Part part = {props.part[1]} />
    <Part part = {props.part[2]} />
  </>
  )
}

function Total(props) {
  let a = 0
  props.part.forEach(p => {
    a += p.exercises
  })
  console.info(a)
  return (
  <>
    <p>{a}</p>
  </>
  )
}

function App() {
  const course = 'Half Stack application development'
  const part = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises:14
  }]

  return (
    <div>
      <Header course={course} />
      <Content part={part} />
      <Total  part= {part} /> 
    </div>
  )
}

export default App
