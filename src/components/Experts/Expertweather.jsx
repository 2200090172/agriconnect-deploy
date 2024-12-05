import React, { useEffect, useState } from 'react';
import Expertlayout from './Expertlayout';
import './Expertlayout.css';
import './Expertweather.css';
import search_icon from '../../assets/images/weather/search.png';
import cloud_icon from '../../assets/images/weather/cloud.png';
import drizzle_icon from '../../assets/images/weather/drizzle.png';
import rain_icon from '../../assets/images/weather/rain.png';
import snow_icon from '../../assets/images/weather/snow.png';
import wind_icon from '../../assets/images/weather/wind.png';
import humidity_icon from '../../assets/images/weather/humidity.png';
import clear_icon from '../../assets/images/weather/clear.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Expertweather = () => {
  const navigate = useNavigate();
  const { location } = useParams();
  const { state } = useLocation(); // Retrieve state passed from navigation
  const selectedRequest = state?.selectedRequest; // Access the selectedRequest from state
  const [city, setCity] = useState(location || '');
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    try {
      const apiKey = '9bc04c5318197057e0bbd0c99da100ec';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
      };
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      if (data.weather) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        setCity('');
        window.alert("Please enter a valid city ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location) {
      search(location); // Trigger search with initial location
    }
  }, [location]);

  return (
    <Expertlayout>
      <header className="expert-header">
        <div className="overlay">
          <h1 className="expert-title">Expert Weather Report</h1>
          <div className='weather'>
            <div className='search-bar'>
              <input
                type='text'
                placeholder='Search'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <img
                src={search_icon}
                alt=''
                onClick={() => search(city)}
              />
            </div>
            <div>
              <img src={weatherData.icon} className='weather-icon' alt='' />
              <p className='temperature'>{weatherData.temperature}° C</p>
              <p className='location'>{weatherData.location}</p>
              <div className='weather-data'>
                <div className='col'>
                  <img src={humidity_icon} alt='' />
                  <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className='col'>
                  <img src={wind_icon} alt='' />
                  <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </div>
            <span
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                textAlign: 'center',
                transition: 'background-color 0.3s',
                textDecoration: 'none'
              }}
              onClick={() => navigate('/expertinrequests', { state: { selectedRequest } })}
            >
              Back
            </span>
          </div>
        </div>
      </header>
    </Expertlayout>
  );
};

export default Expertweather;
