const CountryList = ({ shownCountries, setShownCountries }) => {
    const reformatCountry = ( setInfo ) => {
        setShownCountries([setInfo])
    }
    return(
        <div>
            {shownCountries.map(
                country => 
                <li key={country.name.common}>
                    {country.name.common} 
                    <button onClick={() => reformatCountry(country)}>Show</button>
                </li>)}
        </div>
    )
}

export default CountryList