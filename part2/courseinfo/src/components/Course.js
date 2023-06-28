import React from 'react'

const Content = ({ courseContent }) =>{
    let total = 0
    courseContent.forEach(value => total += value.exercises)
  
    const content =  courseContent.map(content => (
      <p key={content.id}>{content.name}: {content.exercises}</p>
    ))
  
    return(
      <div>
        {content}
        <strong>Total of {total} exercises</strong>
      </div>
    )
  }
  
  const Header = ({ title }) => {
    return <h1>{title}</h1>
  }
  
  const Course = ({ title, courses}) =>{
    return (
      <div>
        <Header title={title}/>
        <Content courseContent={courses}/>        
      </div>
    )
    
  }

  export default Course