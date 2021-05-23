import React from "react";
import "./CurrentCity.css";
import Icon from '../Icon/Icon';


const CurrentCity = (props) => {
  return (
  
    <div className="currentcity ">
      <div className="col currentLoc">
        <h4>{props.city}</h4>
        <p>{props.currentDay}</p>
        <Icon icon={props.icon} />
        <p>{props.temp}</p>
      </div>
      <div className="col  details">
        <p>Humidity: {props.humidity}</p>
        <p>Wind: {props.wind}</p>
      </div>
    </div>
  );
};

export default CurrentCity;
