import React from "react";
import "./Icon.css";
import Cloudy from "../../assets/cloudy.svg";
import Rain from "../../assets/rainy.svg";
import Sunny from "../../assets/sunny.svg";
import Thunder from "../../assets/thunder.svg";
import Snowy from "../../assets/snow.svg";
import Thermoneter from "../../assets/thermoneter.svg";

const Icon = props =>{
    switch(props.icon){
        case 'Cloudy':
            return <img className="icon" src={Cloudy} alt={Cloudy} />
            break;
        case 'Rain':
            return <img className="icon" src={Rain} alt={Rain} />
            break;
        case 'Sunny':
            return <img className="icon" src={Sunny} alt={Sunny} />
            break;
        case 'Thunder':
            return <img className="icon" src={Thunder} alt={Thunder} />
            break;
        case 'Snowy':
            return <img className="icon" src={Snowy} alt={Snowy} />
            break;
        default:
            return <img className="icon" src={Thermoneter} alt={Thermoneter}/>
    }
};

export default Icon;