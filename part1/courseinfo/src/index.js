import React from 'react'
import ReactDOM from 'react-dom'

const Header = (header) =>{
  return ( 
    <h1>{header.course}</h1>
  )
}

const Part = (content) => {
  return(
    <p>{content.name}: {content.exercises}</p>
  )
}

const Content = (content) => {

  return (
    <div>
      <Part name={content.parts[0].name} exercises={content.parts[0].exercises}/>
      <Part name={content.parts[1].name} exercises={content.parts[1].exercises}/>
      <Part name={content.parts[2].name} exercises={content.parts[2].exercises}/>
    </div>
  )
}

const Total = (total) => {
  let totalExercises = 0
  total.parts.forEach(element => {
    totalExercises = totalExercises + element.exercises
  });
  return (
   <p>Total exercises: {totalExercises}</p>
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
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
  
}

ReactDOM.render(<App />, document.getElementById('root'))