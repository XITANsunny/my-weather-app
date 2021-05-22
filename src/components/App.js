import React, { useDebugValue } from "react";
//import {useState} from 'react';
import WeatherBody from "./WeatherBody/WeatherBody";
import weather from "../services/weatherServices";
import { fetchCurrentWeather } from "../services/weather";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import CurrentCity from "./CurrentCity/CurrentCity";

import "./App.css";

// TODO: make it an env variable or move it to a different file
const API_KEY = '28b9c5f6b18b44de8cc5fee76406cf72';
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
function transferWeatherData(apiResult) {
  const weatherList = apiResult.data.slice(0, 7).map((d) => {
    const dayIndex = new Date(d.ts * 1e3).getDay();
    return {
      day: DAYS_IN_WEEK[dayIndex],
      minTemp: d.min_temp,
      maxTemp: d.max_temp,
    };
  });

  return {
    weatherList,
    city: apiResult.city_name,
  };
}

function getWeatherDataForCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { longitude, latitude } = coords;
        weather
          .get(
            `daily?lat=${latitude}&lon=${longitude}&key=28b9c5f6b18b44de8cc5fee76406cf72`
          )
          .then((res) => {
            resolve(transferWeatherData(res.data));
          });
      });
    } else {
      alert(
        "Geolocation is not supported by this browser, try update the input box for the location"
      );
      reject();
    }
  });
}
//fetch the data
//if (long && lat){

//}else{
//use the input box for location
//}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherList: [],
      city: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    getWeatherDataForCurrentLocation().then(({ weatherList, city }) => {
      this.setState({ isLoaded: true, weatherList, city });
    });
  }

  searchCity = async (city) => {
    await weather
      .get(`daily?city=${city}&key=28b9c5f6b18b44de8cc5fee76406cf72`)
      .then((res) => {
        const { weatherList, city } = transferWeatherData(res.data);
        this.setState({
          weatherList,
          city,
          isLoaded: true,
        });
      });
  };

  render() {
    const { city, weatherList, isLoaded } = this.state;

    // Loader
    if (!isLoaded) {
      return <Loader msg={"Loading..."} />;
    }

    // TODO handle icon
    return (
      <div className="App">
        <div className="weatherContainer">
          <SearchBar city={city} searchCity={this.searchCity} />
          <CurrentCity className="currentCity" />

          <div className="daily">
            {weatherList.map(({ day, minTemp, maxTemp }, i) => (
              <WeatherBody
                key={i}
                day={day}
                minTemp={minTemp}
                maxTemp={maxTemp}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/*const App = () =>{
    const [city, setCity] = useState('');
    const [loading, setLoading] =useState(false);
    const [weather,setWeather] =useState([]);

    const searchCity = async (city) =>{
        setCity(city);
        setLoading(true);
        const weather = await weather(city);
        setWeather(weather);
        setLoading(false);
    };

    
    return(
        <div className="App">
            <div className="weatherContainer pt-3 pb-3">
                <WeatherBody day={'Monday'} icon={'Sunny'} minTemp={16} maxTemp={20}/>
                <WeatherBody day={'Tuesday'} icon={'Sunny'} minTemp={15} maxTemp={21}/>
                <WeatherBody day={'Wednesday'} icon={'Sunny'} minTemp={14} maxTemp={19}/>
                <WeatherBody day={'Thursday'} icon={'Sunny'} minTemp={13} maxTemp={18}/>
                <WeatherBody day={'Friday'} icon={'Sunny'} minTemp={12} maxTemp={17}/>
                <WeatherBody day={'Saturday'} icon={'Sunny'} minTemp={11} maxTemp={16}/>
                <WeatherBody day={'Sunday'} icon={'Sunny'} minTemp={10} maxTemp={15}/>
            </div>
            
        </div>
        )
};
*/

export default App;
