const CountryInfo = ({ country }) => {
    return(
        <div>
            <h2>Languages</h2>
            {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
            <img src={country.flags.png} alt={`${country.name.common} flag`} width="250px" />
        </div>
    )
}

export default CountryInfo