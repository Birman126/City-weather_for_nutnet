import React from "react";

const Form = (props) => (
  <form className="city-form" onSubmit={props.weatherMethod}>
    <input
      className="city-form-text"
      type="text"
      name="city"
      placeholder="Укажите город"
    />
  </form>
);

export default Form;
