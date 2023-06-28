import userService from '../services/users'

// REMOVE USER FROM DATABASE
const RemoveUser = ({ person }) => {
  
  const handleDelete = ( person ) => {
    if(window.confirm(`Do you wanna delete ${person.name}?`)){
      userService
      .userDelete(person.id)
      .then(response => {
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <button onClick={() => handleDelete(person)}>Delete</button>
  )
}

// DISPLAY USER INFO
const Display = ({ personToShow  }) =>{
  
    return (
      <li>{personToShow.name} - {personToShow.number} <RemoveUser key={personToShow.id} person={personToShow} /></li>   
    )
  }

// SHOW MESSAGE 
const ShowMessage = ({ message, typeMessage}) => {
  if(message === null){
    return null
  }

  return(
    <div className={typeMessage}>{message}</div>
  )
}
export {Display, ShowMessage}