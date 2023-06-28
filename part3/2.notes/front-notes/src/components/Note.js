const Note = ({ note, toggleImportance, removeNote}) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.id} - {note.content} <button onClick={toggleImportance}>{label}</button> <button onClick={removeNote}>delete</button>
    </li>
  )
}

const Message = ({ message }) => {
	if(message === null){
		return null
	}
	return(
		<div className="error">
			{message}
		</div>
	)
}

export {Note, Message}