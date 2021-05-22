import React from "react";
//import { Container, Row, Col } from "react-bootstrap";
import "./CurrentCity.css";
import Icon from '../Icon/Icon';

const CurrentCity = (props) => {
  return (
    <div className="currentcity">
      <div className="col">
        <span>{props.city}</span>
        <span>{props.currentDay}</span>
        <Icon icon={props.icon} />
        <span>{props.temp}</span>
      </div>
      <div className="col">
        <span>Humidity: {props.humidity}</span>
        <span>Wind: {props.wind}</span>
      </div>
    </div>
  );
};

export default CurrentCity;
