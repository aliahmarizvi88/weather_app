import './weatherCard.css';
import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Search,
  Waves,
  Wind,
  MapPin,
  Cloud,
  CloudSun,
  CloudFog,
  CloudSnow,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudHail,
} from 'lucide-react';

const WeatherCard = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState({});
  const getFormattedDate = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const formattedDate = `${day < 10 ? '0' + day : day}-${month}-${year}`;

    return formattedDate;
  };

  const getWeatherCode = (weatherCode) => {
    const iconMap = {
      113: <Sun size={70} color="Gold" strokeWidth={1.25} />,
      116: <CloudSun size={70} color="Yellow" strokeWidth={1.25} />,
      119: <Cloud size={70} color="#B0C4DE" strokeWidth={1.25} />,
      122: <Cloud size={70} color="#B0C4DE" strokeWidth={1.25} />,
      143: <CloudFog size={70} color="#C0C0C0" strokeWidth={1.25} />,
      248: <CloudFog size={70} color="#C0C0C0" strokeWidth={1.25} />,
      296: <CloudDrizzle size={70} color="#ADD8E6" strokeWidth={1.25} />,
      176: <CloudDrizzle size={70} color="#ADD8E6" strokeWidth={1.25} />,
      185: <CloudDrizzle size={70} color="#ADD8E6" strokeWidth={1.25} />,
      302: <CloudRain size={70} color="#4682B4" strokeWidth={1.25} />,
      308: <CloudLightning size={70} color="#FFA500" strokeWidth={1.25} />,
      389: <CloudLightning size={70} color="#FFA500" strokeWidth={1.25} />,
      359: <CloudLightning size={70} color="#FFA500" strokeWidth={1.25} />,
      179: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      314: <CloudSnow size={70} color="#B0E0E6" strokeWidth={1.25} />,
      326: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      260: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      332: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      338: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      230: <CloudSnow size={70} color="#FFFFFF" strokeWidth={1.25} />,
      350: <CloudHail size={70} color="#A9A9A9" strokeWidth={1.25} />,
      182: <CloudHail size={70} color="#A9A9A9" strokeWidth={1.25} />,
    };

    return (
      iconMap[weatherCode] || <Sun size={70} color="Gold" strokeWidth={1.25} />
    );
  };

  const search = async (city) => {
    try {
      const url = `http://api.weatherstack.com/current?access_key=6ff1d5a9cf6d47183693b9f9bb6af04a&query=${city}&unit=m`;

      const response = await fetch(url);
      const data = await response.json();

      setWeather({
        city: data.location.name,
        weatherDes: data.current.weather_descriptions[0],
        weatherCode: data.current.weather_code,
        temperature: data.current.temperature,
        feelsLike: data.current.feelslike,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search('Lahore');
  }, []);

  return (
    <div className="App">
      <div className="weather">
        <div className="search">
          <input type="text" ref={inputRef} name="search" placeholder="City" />
          <Search onClick={() => search(inputRef.current.value)} />
        </div>
        <div className="header">
          <h3>
            <MapPin strokeWidth={1.25} />
            {weather.city}
          </h3>
          <p>{getFormattedDate()}</p>
        </div>
        <div className="temp">
          <h3>{weather.weatherDes}</h3>
          {getWeatherCode(weather.weatherCode)}
          <h1>{weather.temperature}&deg;C</h1>
          <p>{`Feels like ${weather.feelsLike}`}&deg;</p>
        </div>
        <div className="footer">
          <div className="footer-item">
            <h3>
              <Waves size={24} />
              Humidity
            </h3>
            <p>{`${weather.humidity}%`}</p>
          </div>
          <div className="footer-item">
            <h3>
              <Wind size={24} />
              Wind Speed
            </h3>
            <p>{`${weather.windSpeed}km/h`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
