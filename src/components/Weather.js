import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = '391e6fd243584121b4555745242505';
    const [isFetching, setIsFething] = useState(false)

    const fetchWeather = async () => {
        if (!city) return;
        try {
            setIsFething(true)
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
            );
            const data = await response.json();
            if (data.error) {
                setError(data.error.message);
                setWeather(null);
            } else {
                console.log(data)
                setWeather(data);
                setError('');
            }
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeather(null);
        } finally {
            setIsFething(false)
        }
    };


    const handleSearch = () => {
        fetchWeather();
    };

    const getLocation = () => {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const success = async (pos) => {
            setIsFething(true)

            let crd = pos.coords;
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}`
            );
            const data = await response.json();
            if (data.error) {
                setError(data.error.message);
                setWeather(null);
            } else {
                setCity(data.location.name)
                setWeather(data);
                setError('');
            }

            setIsFething(false)
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
        //


    }

    return (
        <div className='weather-wrapper '>

            <div className="weather-app">
                <h1>Weather App</h1>
                <div className="input-container">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                    />
                    <button onClick={handleSearch} disabled={isFetching}>Search {isFetching && <i className="ri-restart-line"></i>}</button>
                    <button className='bg-none' onClick={() => getLocation()}>
                        <i class="ri-map-pin-line"></i>
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.location.name}, {weather.location.country}</h2>
                        <p>Temperature: {weather.current.temp_c}°C</p>
                        <p>Condition: {weather.current.condition.text}</p>
                        <img src={weather.current.condition.icon} alt="weather icon" />
                        <p>Humidity: {weather.current.humidity}%</p>
                        <p>Wind Speed: {weather.current.wind_kph} kph</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
