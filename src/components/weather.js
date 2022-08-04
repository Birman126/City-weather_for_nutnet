import React from "react";
import clear from "../images/sun.svg";
import cloud from "../images/clouds.svg";
import rain from "../images/Rain.svg";
import fog from "../images/fog.svg";

const weatherFunc = (key) => {
  if (key === "Clear") {return clear;}
  if (key === "Clouds") {return cloud;}
  if (key === "Rain") {return rain;}
  if (key === "Fog") {return fog;}
};

const Weather = (props) => {
  var classesFavor ='button-to-favor'
  console.log(localStorage.getItem('Cityes').split(','))
  function wordInArr(word, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (word === arr[i]) {
        return true;
      }
    }
    return false ;
  }
  console.log(props.classesFavor)
  // wordInArr(props.city,localStorage.getItem('Cityes').split(','))
  // console.log(classesFavor)
  // if(wordInArr) {classesFavor='button-to-favor'}
  // else {classesFavor=classesFavor+' button-to-favor__done'}
  // props.handlerClickFavor()
  return (
    <div className="weather-main">
      {props.city && (
        <div className="weather-box">
          <div className="weather-box-button">
            <button className="button-back" onClick={props.handlerClickBack}>
              <div className="button-back-icon"></div>
              <div className="button-back-text">Назад</div>
            </button>
            <button
              onChange={wordInArr}
              className={props.classesFavor}
              onClick={props.handlerClickFavor}
            ></button>
          </div>
          <div className="weather-city">{props.city}</div>
          <div className="weather-comment">{props.weatherDes}</div>
          <div className="weather-box-temp">
            <div className="weather-box-temp-num">{props.temp}</div>
            <img
            className="weather-box-temp-img"
              src={weatherFunc(props.weather)}
              width="191px"
              height="191px"
              alt={props.weatherDes}
            ></img>
          </div>
          <div className="weather-pressure"> 
          <div className="weather-pressure_icon"
              
              
              alt='барометр'
            ></div>
            {props.pressure} мм рт.ст.</div>
          <div className="weather-sunset">Закат в {props.sunset}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
