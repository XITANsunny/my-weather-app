import React from "react";
//import { Container, Row, Col } from "react-bootstrap";
import "./CurrentCity.css"

const CurrentCity = () =>{
    return(
    <div className="currentcity">
    
        <div className="col">
        <span>Sydney</span>
        <span>Tuesday</span>
        <span>icon 18</span>
       
        </div>
        <div className="col">
            <span>Percipitation:</span>
            <span>Humidity:</span>
            <span>Wind:</span>
            <span>Pollen Count:</span>
        </div>
    
    
  </div>)
  
};

export default CurrentCity;