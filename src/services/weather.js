
//Put api key to env varivale
const WEATHERBIT_API_KEY = '28b9c5f6b18b44de8cc5fee76406cf72';

//provide data for a week
const fetchCurrentWeather = async function fetchCurrentWeather(lat,long){
   const ret = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${long}&key=${WEATHERBIT_API_KEY}&hours=48`).then(d=>d.json());
   return ret;

}


export {fetchCurrentWeather}
  