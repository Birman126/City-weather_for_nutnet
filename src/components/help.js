import React from "react";

const Help = (props) => (
  <div className="box-help">
    <div className="box-help-arrow"></div>
    <p className="box-help-city">Начните вводить город, например: <span className="box-help-city-example" onClick={props.handlerClickExample}>Ижевск</span></p>
    <p className="box-help-favor">
      Используйте значок "закладки", чтобы закрепить город на главной
    </p>
    <div className="box-help-favor-icon"></div>
  </div>
);

export default Help;
