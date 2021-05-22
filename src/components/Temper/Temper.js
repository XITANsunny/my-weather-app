import React from "react";
import "./Temper.css";

const Temper = props =>{
    return (
        <div className="Temp">
            <span className="min">{props.maxTemp}&#176;</span>
            <span className="min">{props.minTemp}&#176;</span>
        </div>
    )
}

export default Temper;
