import React from "react";
import clear from "../images/sun.svg";
import cloud from "../images/clouds.svg";

const weatherFunc = (key) => {
if (key === 'Clear') {return clear}
if (key === 'Clouds') {return cloud}
}


const Weather = (props) => {
  
  return (
    <div className="weather-main">
      {props.city && (
        <div className="weather-box">
          <div className="weather-box-button">
            <button className="button-back" onClick={props.handlerClickBack}>
              <div className="button-back-icon"></div>
              <div className="button-back-text">Назад</div>
            </button>
            <button className="button-to-favor" onClick={props.handlerClickFavor}></button>
          </div>
          <div className="weather-city">{props.city}</div>
          <div className="weather-comment">{props.weatherDes}</div>
          <div className="weather-box-temp">
            <div className="weather-box-temp-num">{props.temp}</div>
            {/* <div className="weather-box-temp-icon"> */}
            <img src={weatherFunc(props.weather)} width="191px" height="191px" alt='weather'></img>
            
            {/* </div> */}
          </div>
          <div className="weather-pressure"> {props.pressure} мм рт.ст.</div>
          <div className="weather-sunset">Закат в {props.sunset}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
