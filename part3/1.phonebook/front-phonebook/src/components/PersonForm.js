const PersonForm = ({addPersonEvent, newName, newNumber, handleName, handleNumber}) => {

    return (
        <form onSubmit={addPersonEvent}>
        <div>
          Name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm