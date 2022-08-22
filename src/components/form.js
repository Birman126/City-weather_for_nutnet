import React from "react";



const Form = (props) => (
  
  
  <form className="city-form" onSubmit={props.weatherMethod}  >
    <input
      className="city-form-text"
      type="text"
      name="city"
      placeholder="Укажите город"
      autocomplete ='off'
      onChange={event=> props.searchItem(event.target.value)}
      
      // onClick={()=>console.log(props.styleItem)}
    />
    <ul className="autocomplete">
      <li className={props.styleItem} onClick={() => (props.weatherMethod(props.listItem.toString()))}>{props.listItem}</li>
    </ul>
  </form>
);

export default Form;
