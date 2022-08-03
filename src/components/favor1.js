import React from "react";
import clear from "../images/sun.svg";
import cloud from "../images/clouds.svg";

const weatherFunc = (key) => {
if (key === 'Clear') {return clear}
if (key === 'Clouds') {return cloud}
}

class Favor extends React.Component {
  
  state = {
    API_KEY: "d2299dee007ffb7f093b142b8732dfee",
    page1: true,
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  };

  gettingWeather = async (e) => {
    const city = this.props.city;
    

    if (this.props.city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.state.API_KEY}`
      );
      
      const data = await api_url.json();
      console.log(data);
      this.setState({ page1: false });
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + 12 + ":" + date.getMinutes();
      var temp = (data.main.temp - 273).toFixed(0);
      var temp_data = temp.toString() + "\xB0";

      this.setState({
        temp: temp_data,
        weather: data.weather[0]["main"],
        weatherDes: data.weather[0]["description"],
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: "Ошибка",
      });
      
      }
  };
  componentDidMount() {this.gettingWeather()}
  
  render() {
    console.log(this.state.temp);
    console.log(this.props.city)
    
    return (
    
      <div className="favor-weather-box">
          <div className="favor-weather-box_name">{this.props.city}</div>
          <div className="favor-weather-box_temp">{this.state.temp}</div>
          <div className="favor-weather-box_icon">
          <img src={weatherFunc(this.state.weather)} width="78px" height="78px" alt='weather'></img>
          </div>
      </div>);
  }
}
export default Favor;
