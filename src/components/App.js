import React from "react";
//import {useState} from 'react';
import { Form } from "react-bootstrap";
import WeatherBody from "./WeatherBody/WeatherBody";
import weather from "../services/weatherServices";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import CurrentCity from "./CurrentCity/CurrentCity";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


// Unit supports Celsius Fahrenheit
function parseTemp(unit, value) {
  if (unit === "Celsius") {
    return value;
  }
  return (value * 9) / 5 + 32;
}

// TODO: move it to a different file
function degToWindDir(deg) {
  if (deg > 11.25 && deg <= 33.75) {
    return "NNE";
  } else if (deg > 33.75 && deg <= 56.25) {
    return "ENE";
  } else if (deg > 56.25 && deg <= 78.75) {
    return "E";
  } else if (deg > 78.75 && deg <= 101.25) {
    return "ESE";
  } else if (deg > 101.25 && deg <= 123.75) {
    return "ESE";
  } else if (deg > 123.75 && deg <= 146.25) {
    return "SE";
  } else if (deg > 146.25 && deg <= 168.75) {
    return "SSE";
  } else if (deg > 168.75 && deg <= 191.25) {
    return "S";
  } else if (deg > 191.25 && deg <= 213.75) {
    return "SSW";
  } else if (deg > 213.75 && deg <= 236.25) {
    return "SW";
  } else if (deg > 236.25 && deg <= 258.75) {
    return "WSW";
  } else if (deg > 258.75 && deg <= 281.25) {
    return "W";
  } else if (deg > 281.25 && deg <= 303.75) {
    return "WNW";
  } else if (deg > 303.75 && deg <= 326.25) {
    return "NW";
  } else if (deg > 326.25 && deg <= 348.75) {
    return "NNW";
  } else {
    return "N";
  }
}

// TODO: make it an env variable or move it to a different file
const API_KEY = "28b9c5f6b18b44de8cc5fee76406cf72";
// TODO: move it to a different file
const DAYS_IN_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// TODO: move it to a different file
// Convert the data from weatherbit.io to make it UI friendly
function transferWeatherData(apiResultForDays, apiResultForCurrentTime) {
  const weatherListForDays = apiResultForDays.data.slice(0, 7).map((d) => {
    console.log(apiResultForCurrentTime);
    const dayIndex = new Date(d.ts * 1e3).getDay();
    return {
      day: DAYS_IN_WEEK[dayIndex],
      minTemp: d.min_temp,
      maxTemp: d.max_temp,
      iconCode: d.weather.code,
    };
  });
  const {
    temp: currentTemp,
    rh: humidity,
    wind_spd: windSpeedInMS,
    wind_dir: windDegree,
    weather: currentWeather,
  } = apiResultForCurrentTime.data[0];

  return {
    weatherListForDays,
    city: apiResultForDays.city_name,
    currentWeather: {
      humidity: `${humidity}%`,
      wind: `${Math.round(windSpeedInMS * 3.6 * 1e3) / 1e3} kph ${degToWindDir(
        windDegree
      )}`,
      temp: currentTemp,
      iconCode: currentWeather.code,
    },
  };
}

async function fetchWeatherData(lat, lon, city) {
  if ((lat == null || lon == null) && city == null) {
    throw new Error("Must provide lat & long or city");
  }
  let apiUrlSuffix;
  if (lat && lon) {
    apiUrlSuffix = `?lat=${lat}&lon=${lon}&key=${API_KEY}`;
  } else {
    apiUrlSuffix = `?city=${city}&key=${API_KEY}`;
  }
  const resForDays = await weather.get(`forecast/daily${apiUrlSuffix}`);
  const resForCurrentTime = await weather.get(`current${apiUrlSuffix}`);

  return transferWeatherData(resForDays.data, resForCurrentTime.data);
}

function getWeatherDataForCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { longitude, latitude } = coords;
        resolve(await fetchWeatherData(latitude, longitude));
      });
    } else {
      alert(
        "Geolocation is not supported by this browser, try update the input box for the location"
      );
      reject();
    }
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherListForDays: [],
      city: null,
      currentWeather: null,
      isLoaded: false,
      isCelsius: true,
    };
  }

  componentDidMount() {
    getWeatherDataForCurrentLocation().then(
      ({ weatherListForDays, city, currentWeather }) => {
        this.setState({
          isLoaded: true,
          weatherListForDays,
          city,
          currentWeather,
        });
      }
    );
  }

  searchCity = async (city) => {
    const { weatherListForDays, currentWeather } = await fetchWeatherData(
      undefined,
      undefined,
      city
    );
    this.setState({
      weatherListForDays,
      currentWeather,
      city,
      isLoaded: true,
    });
  };

  render() {
    const { city, weatherListForDays, isCelsius, isLoaded, currentWeather } =
      this.state;

    // Loader
    if (!isLoaded) {
      return <Loader msg={"Loading..."} />;
    }
    const tempUnit = isCelsius ? "Celsius" : "Fahrenheit";

    // TODO handle icon
    return (
      <div className="App">
        <div className="weatherContainer">
          <SearchBar city={city} searchCity={this.searchCity} />
          <CurrentCity
            className="currentCity"
            city={city}
            currentDay={
              weatherListForDays.length ? weatherListForDays[0].day : ""
            }
            icon={currentWeather.iconCode}
            humidity={currentWeather.humidity}
            wind={currentWeather.wind}
            temp={parseTemp(tempUnit, currentWeather.temp)}
          />
          Using Fahrenheit
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(event) => {
                this.setState({
                  isCelsius: !isCelsius,
                });
              }}
            />
          <div className="daily">
            {weatherListForDays.map(
              ({ day, minTemp, maxTemp, iconCode }, i) => (
                <WeatherBody
                  icon={iconCode}
                  key={i}
                  day={day}
                  minTemp={parseTemp(tempUnit, minTemp)}
                  maxTemp={parseTemp(tempUnit, maxTemp)}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
