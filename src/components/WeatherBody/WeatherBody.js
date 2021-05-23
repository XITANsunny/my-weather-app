import React from "react";
import './WeatherBody.css';
import Days from '../Days/Days';
import Icon from '../Icon/Icon';
import Temper from '../Temper/Temper';

const WeatherBody = (props) => {
    return(
        
        <div className="weatherBody">
            <Days day={props.day} />
            <Icon icon ={props.icon} />
            <Temper minTemp = {props.minTemp} maxTemp = {props.maxTemp} />

          
        </div>
    )
};

export default WeatherBody;
