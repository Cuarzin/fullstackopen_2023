const Filter = ({ nameToSearch, handleSearchName}) => {
  return (
  <div>
    Search: <input value={nameToSearch} onChange={handleSearchName}/>
  </div>
  )
}

export default Filter