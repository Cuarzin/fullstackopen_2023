import { useState, useEffect } from 'react'
import {Note, Message} from './components/Note'
import noteService from './services/notes'

const Footer = () => {
	const footerStyle = {
	  color: 'green',
	  fontStyle: 'italic',
	  fontSize: 16
	}
	return (
	  <div style={footerStyle}>
		<br />
		<em>Note app, Department of Computer Science, University of Helsinki 2020</em>
	  </div>
	)
  }
  

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}
    
    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(`Note ${note.content} was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const removeNote = (id) => {
    const note = notes.find(note => note.id === id)
    noteService
    .remove(id)
    .then(response => {
      if(response.status === 200){
        setErrorMessage(`Note ${note.content} has been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }
    })
    window.location.reload()
  }

  return (
    <div>
      <h1>Notes</h1>
	    <Message message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} removeNote= {() => removeNote(note.id)}/>
        )}
        </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
	  <Footer/>
    </div>
  )
}

export default App