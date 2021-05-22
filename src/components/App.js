import React from "react";
import WeatherBody from "./WeatherBody/WeatherBody"

const App =() => {
    return (
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
}

export default App;