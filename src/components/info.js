import React from "react";


const Info = (props) => (
  <div className="header" onClick={props.handlerClickBack} >
    <div className="head-logo"></div>
    <div className="head-name">WeatherCheck</div>
  </div>
);

export default Info;
