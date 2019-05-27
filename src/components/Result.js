import React from 'react';
import './Result.css'

const Result = (props) => {

    const { error, city, temp, sunrise, sunset, pressure, wind, date, iconCode } = props.weather;

    let content = null;

    if (!error && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        const tempFixed = temp.toFixed(1);

        content = (
            <>
                <h3>Wyniki wyszukiwania dla <em>{city.toUpperCase()}</em></h3>
                <h4>Stan aktualny na: {date}</h4>
                <h4>Temperatura: {tempFixed} &#176;C</h4>
                <h4>Wiatr: {wind} m/s
                <img src={`http://openweathermap.org/img/w/${iconCode}.png`} alt="grafika" /></h4>
                <h4>Ciśnienie: {pressure} hPa</h4>
                <h5>Wschód Słońca o: {sunriseTime}</h5>
                <h5>Zachód Słońca o {sunsetTime}</h5>

            </>
        )
    }
    return (
        <div className='result'>
            {error ? `Brak informacji w bazie o miejscowości  ${city}` : content}
        </div>
    );
}

export default Result;
