import CountryInfo from './countryInfo'
import Weather from './weather'

const Country = ({ shownCountries, weather }) => {
    const country = shownCountries[0]
    return(
        <div>
            <h2>{country.name.common}</h2>
            <ul>
                <li>Capital: {country.capital}</li>
                <li>Population: {country.population}</li>
            </ul>
            <CountryInfo country={country}/>
            <Weather weather={weather} selectedCountry={country.name.common}/>
        </div>
    )
}

export default Country