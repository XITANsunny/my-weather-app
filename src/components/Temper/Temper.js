import React from "react";
import "./Temper.css";

const Temper = props =>{
    return (
        <div className="Temp">
            <span className="min">{props.maxTemp}</span>
            <span className="min">{props.minTemp}</span>
        </div>
    )
}

export default Temper;
