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
        case 800:
            return <img className="icon" src={Sunny} alt={Cloudy} />
            
        case 801:
            return <img className="icon" src={Cloudy} alt={Cloudy} />
            
        case 802:
            return <img className="icon" src={Cloudy} alt={Cloudy} />
            
        case 803:
            return <img className="icon" src={Cloudy} alt={Cloudy} />
            

           
        case 500:
            return <img className="icon" src={Rain} alt={Rain} />
            

        case 501:
            return <img className="icon" src={Rain} alt={Rain} />
            

        case 502:
            return <img className="icon" src={Rain} alt={Rain} />
            
        
        case 200:
            return <img className="icon" src={Thunder} alt={Thunder} />
            
        case 201:
            return <img className="icon" src={Thunder} alt={Thunder} />
            
        case 202:
            return <img className="icon" src={Thunder} alt={Thunder} />
            
        case 230:
            return <img className="icon" src={Thunder} alt={Thunder} />
            
        case 600:
            return <img className="icon" src={Snowy} alt={Snowy} />
            
        case 601:
            return <img className="icon" src={Snowy} alt={Snowy} />
            
        case 602:
            return <img className="icon" src={Snowy} alt={Snowy} />
            
        case 610:
            return <img className="icon" src={Snowy} alt={Snowy} />
            

        default:
            return <React.Fragment>
                <img className="icon" src={Thermoneter} alt={Thermoneter}/>
                <h5>{props.description}</h5>
            </React.Fragment>
            
    }
};

export default Icon;