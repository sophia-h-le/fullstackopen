import React from 'react'

const Header = ({name}) => {
    return (
      <h3>{name}</h3>
    )
  }
  
const Part = ({part}) => {
return (
    <div>
    {part.name} {part.exercises}
    </div>
)
}
  
const Content = ({parts}) => {
return (
    <>
        {parts.map(part =>
        <Part key={part.id} part={part}/>  
        )}
    </>
)
}

const TotalAmount = ({parts}) => {
let totalAmount = parts.reduce(function(sum, part) {
    return sum + part.exercises
}, 0)

return (
    <h4>
        Total of {totalAmount} exercises
    </h4>
)
}

const Course = ({course}) => {
return (
    <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <TotalAmount parts={course.parts} />
    </>
)
}

export default Course

