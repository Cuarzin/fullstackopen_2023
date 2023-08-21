import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import {Display, ShowMessage} from './components/Display'
import userService from './services/users'

const App = () => {
  const [ persons, setPersons ] = useState([  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ nameToSearch, setNameToSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('')

  const personToShow = showAll ? persons : persons.filter( person => person.name.toLowerCase().includes(nameToSearch.toLowerCase()))
  
  const hook = () =>{
    userService
    .getAll()
    .then(initialSetup => setPersons(initialSetup))
  }
  useEffect(hook, [])


  const addPersonEvent = (event) =>{
    event.preventDefault()

    // ADD PERSON TO PHONEBOOK
    if(!persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )){
      const newObjPerson = {
        name:  newName,
        number: newNumber,
      }
      userService
      .createUser(newObjPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber('')
        setNewName('')
        setMessage(`${newObjPerson.name} has been added to phonebook`)
        setMessageType('create')
      })
      .catch(e => {
        const getError = e.response.data.error
        setMessage(getError)
        setMessageType('error')
      })      
      setTimeout(() => {
        setMessage(null)
      }, 2500)
      return
    }
    // UPDATE PHONE NUMBER
    else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const getId = persons.find( person => person.name.toLowerCase() === newName.toLowerCase()).id
        const newPhoneNumber = {
        name: newName,
        number: newNumber,
        }
        userService
        .updateNumber(getId, newPhoneNumber)
        .then(response => {
          userService
          .getAll()
          .then(initialSetup => setPersons(initialSetup))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(`${newPhoneNumber.name} has already been deleted`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          return
        })
        setMessage(`${newPhoneNumber.name} has been updated`)
        setMessageType('update')
        setTimeout(() => {
          setMessage(null)
        }, 2500)
      }
    }
   
  }

  const handleName = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumber = (event) =>{
    setNewNumber(event.target.value)
    
  }

  const handleSearchName = (event) => {
    setNameToSearch(event.target.value)
    event.target.value === '' ? setShowAll(true) : setShowAll(false)
  }

  return (
    <div>
      <div>
        <h2>Search person</h2>
        <Filter nameToSearch={nameToSearch} handleSearchName={handleSearchName}/>
      </div>
      <h2>Phonebook</h2>
      <ShowMessage message={message} typeMessage={messageType}/>
      <PersonForm 
        addPersonEvent={addPersonEvent} 
        newName={newName} 
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        />      
      <h2>Numbers</h2>
      <div>
        <ul>
          {personToShow.map(
            person => <Display key={person.id} personToShow={person}/>
          )}
        </ul>
      </div>      
    </div>
  )
}

export default App
