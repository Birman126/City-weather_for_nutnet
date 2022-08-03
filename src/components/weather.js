import React, {useState} from "react";
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
  var item ='button-to-favor'
//   const state = {
// favorClass : 'button-to-favor'
//   }

  // const [favorClass, setFavorClass] = useState(['button-to-favor'])
//   function wordInArr(word, arr) {
//     for (let i = 0; i < arr.length; i++) {
//       if (word === arr[i]) {
//         return true;
//       }
//     }
//     return false;
//   }

  
//  const updateFavorIcon =()=> {
//   if (
//     wordInArr(
//       props.city,
//       localStorage.getItem("Cityes").split(",")
//     )
//   ) {this.setState({ favorClass: 'button-to-favor__done' });
//     return(state.favorClass);
//   } else {this.setState({ favorClass: 'button-to-favor' });
//   return(state.favorClass)
// }
//   }
//   console.log(updateFavorIcon())
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
              
              className={props.classesFavor}
              onClick={props.handlerClickFavor}  
            ></button>
          </div>
          <div className="weather-city">{props.city}</div>
          <div className="weather-comment">{props.weatherDes}</div>
          <div className="weather-box-temp">
            <div className="weather-box-temp-num">{props.temp}</div>
            <img
              src={weatherFunc(props.weather)}
              width="191px"
              height="191px"
              alt="weather"
            ></img>
          </div>
          <div className="weather-pressure"> {props.pressure} мм рт.ст.</div>
          <div className="weather-sunset">Закат в {props.sunset}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
