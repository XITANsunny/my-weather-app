import React from "react";
//import {useState} from 'react';
import WeatherBody from "./WeatherBody/WeatherBody";
import weather from "../services/weatherServices";
import { fetchCurrentWeather } from "../services/weather";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import CurrentCity from "./CurrentCity/CurrentCity";

import "./App.css";

function getWeatherDataForCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { longitude, latitude } = coords;
        weather
          .get(`daily?lat=${latitude}&lon=${longitude}&key=28b9c5f6b18b44de8cc5fee76406cf72`)
          .then((res) => {
            resolve(res.data.data);
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
      temp: [],
      city: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
      getWeatherDataForCurrentLocation().then(data => {
        console.log(data);
        this.setState({ isLoaded: true });
      });
  }

  searchCity = async (city) => {
    await weather
      .get(`daily?city=${city}&key=28b9c5f6b18b44de8cc5fee76406cf72`)
      .then((res) => {
        const temp = res.data.data;
        const city = res.data.city_name;
        console.log(temp);
        this.setState({
          temp,
          city,
          isLoaded: true,
        });
      });
  };

  render() {
    //helper methods
    const minTemp = this.state.temp.map((el) => {
      return parseInt(el.low_temp);
    });

    const maxTemp = this.state.temp.map((el) => {
      return parseInt(el.max_temp);
    });

    const icon = this.state.temp.map((el) => {
      return el.weather.code;
    });

    const description = this.state.temp.map((el) => {
      return el.weather.description;
    });

    //Loader
    if (!this.state.isLoaded) {
      return <Loader msg={"Loading..."} />;
    }

    return (
      <div className="App">
        <div className="weatherContainer">
          <SearchBar city={this.state.city} searchCity={this.searchCity} />
          <CurrentCity className="currentCity" />

          <div className="daily">
            <WeatherBody
              day={"Monday"}
              icon={icon[0]}
              minTemp={minTemp[0]}
              maxTemp={maxTemp[0]}
              description={description[0]}
            />
            <WeatherBody
              day={"Tuesday"}
              icon={icon[1]}
              minTemp={minTemp[1]}
              maxTemp={maxTemp[1]}
              description={description[1]}
            />
            <WeatherBody
              day={"Wednesday"}
              icon={icon[2]}
              minTemp={minTemp[2]}
              maxTemp={maxTemp[2]}
              description={description[2]}
            />
            <WeatherBody
              day={"Thursday"}
              icon={icon[3]}
              minTemp={minTemp[3]}
              maxTemp={maxTemp[3]}
              description={description[3]}
            />
            <WeatherBody
              day={"Friday"}
              icon={icon[4]}
              minTemp={minTemp[4]}
              maxTemp={maxTemp[4]}
              description={description[4]}
            />
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
