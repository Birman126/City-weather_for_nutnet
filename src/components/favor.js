import React from "react";
import clear from "../images/sun.svg";
import cloud from "../images/clouds.svg";

const weatherFunc = (key) => {
if (key === 'Clear') {return clear}
if (key === 'Clouds') {return cloud}
}





  


    
const Favor = (props) => {
  const gettingWeatherFavor = async (e) =>{
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=d2299dee007ffb7f093b142b8732dfee`
    );
    
    
    const data = await api_url.json();
    
    // var city = data.name;
    // var temp = data.main.temp;
    // var temp = (data.main.temp - 273).toFixed(0);
    // var temp_data = temp.toString() + "\xB0";
    // console.log((data.main.temp - 273).toFixed(0));
return data
    
  }  

  var data=gettingWeatherFavor();
  console.log(data)
  return (
    
        <div className="favor-weather-box">
            <div className="favor-weather-box_name">{props.city}</div>
            <div className="favor-weather-box_temp">{props.temp}</div>
            <div className="favor-weather-box_icon">
            <img src={weatherFunc(props.weather)} width="78px" height="78px" alt='weather'></img>
            </div>
        </div>
    

  );
};

export default Favor;
