import React from "react";

const Info = (props) => {
  return (
    <div className={props.infoStyle} onClick={props.handlerClickBack}>
      <div className="head-logo"></div>
      <div className="head-name">WeatherCheck</div>
    </div>
  );
};

export default Info;
