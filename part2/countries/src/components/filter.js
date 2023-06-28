const Filter = ({ filter, handleFilterEvent }) => {
    return (
        <div>
            Find countries: <input value={filter} onChange={handleFilterEvent}/>
        </div>
    )
}

export default Filter