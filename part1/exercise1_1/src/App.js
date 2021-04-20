import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.props.name} {props.props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  let parts = props.parts
  let part1 = parts[0]
  let part2 = parts[1]
  let part3 = parts[2]
  return (
    <div>
      <Part props={part1}/>
      <Part props={part2}/>
      <Part props={part3}/>
    </div>
  )
}

const Total = (props) => {
  let parts = props.parts
  let part1 = parts[0]
  let part2 = parts[1]
  let part3 = parts[2]
  let numExercises = part1.exercises + part2.exercises + part3.exercises
  return (
    <>
      <p>Number of exercises {numExercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App