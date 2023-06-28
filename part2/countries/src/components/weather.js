const Weather = ({ weather,selectedCountry }) => {
    console.log(weather)
    return (
        <div>
            <h3>Weather in {selectedCountry}</h3>
        </div>
    )
}

export default Weather

/*
            <h5>Temperature:{weather.current.temperature}</h5>
            <img src={weather.current.weather_icons[0]} alt='weatherIcon'/>
            <p>Wind Direction: {weather.current.wind_speed}mph, direction {weather.current.win_dir}</p>

            <h5>Temperature:{weather.temperature}</h5>
            <img src={weather.weather_icons[0]} alt='weatherIcon'/>
            <p>Wind Direction: {weather.wind_speed}mph, direction {weather.win_dir}</p>*/