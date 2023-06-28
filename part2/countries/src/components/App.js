import React, {useEffect, useState} from "react";
import Filter from "./filter";
import CountryList from "./contryList";
import Country from "./country";
import axios from 'axios';

const App = () =>{
    
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [shownCountries, setShownCountries] = useState ([])
    const [ weather, setWeather ] = useState()
    
    useEffect(() =>{
        axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
            setCountries(response.data)
        })}
        ,[])

    useEffect(()=> {
        const API_KEY = process.env.REACT_APP_API_KEY
        if(shownCountries.length === 1){
            axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${shownCountries[0].name.common}`)
            .then(response => {
                
                setWeather(response.data.current)
            })
        }
    },[shownCountries])
    
    const handleFilterEvent = (event) => {
        const filter = event.target.value
        const filteredCountry = filter === '' ? [] :
        countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        setNewFilter(filter)
        setShownCountries(filteredCountry)
    }
    
    return (
        <div>
            <Filter filter={newFilter} handleFilterEvent={handleFilterEvent}/>
            
            {shownCountries.length === 0 ? <div>Enter a letter to filter a country</div>:
             shownCountries.length > 10 ? <div>Too many matches, specify another filter</div> :
            (shownCountries.length === 1? <Country shownCountries={shownCountries} weather={weather} /> : 
             <CountryList shownCountries={shownCountries} setShownCountries={setShownCountries}/>)}
        </div>
    )
}

export default App