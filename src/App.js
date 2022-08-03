import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import Help from "./components/help";
// import Favor from "./components/favor";
import FavorList from "./components/favorList";

class App extends React.Component {
  
  state = {
    API_KEY: "d2299dee007ffb7f093b142b8732dfee",
    page1: true,
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
    classesFavor: 'button-to-favor'
  };

  gettingWeather = async (e) => {
    const city = e.target.elements.city.value;
    e.preventDefault();

    if (city) {
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
      var pressure = (data.main.pressure * (0.750062)).toFixed(0);

      this.setState({
        temp: temp_data,
        weather: data.weather[0]["main"],
        weatherDes: data.weather[0]["description"],
        city: data.name,
        country: data.sys.country,
        pressure: pressure,
        sunset: sunset_date,
        error: "Ошибка",
      });
    }
  };
  handlerClickBack = () => {
    this.setState({ page1: true });
  };

  render() {
    
    
    if(localStorage.getItem("Cityes")!=null) {var storageArr=localStorage.getItem("Cityes").split(",")}
    else {var storageArr=[]}
    return (
      <div className="wrapper">
        {this.state.page1 && <Info />}
        {this.state.page1 && <Form weatherMethod={this.gettingWeather} />}
        {this.state.page1 && (!localStorage.getItem('Cityes')[0]) &&<Help />}
        {!this.state.page1 && (
          <Weather
            handlerClickBack={this.handlerClickBack}
            handlerClickFavor={this.handlerClickFavor}
            temp={this.state.temp}
            cloud={this.state.cloud}
            weather={this.state.weather}
            weatherDes={this.state.weatherDes}
            city={this.state.city}
            country={this.state.country}
            pressure={this.state.pressure}
            sunset={this.state.sunset}
            error={this.state.error}
            classesFavor={this.state.classesFavor}
            
          />
        )}
        {this.state.page1 && (localStorage.getItem('Cityes')[0]) && <FavorList API_KEY={this.state.API_KEY} storageArr={storageArr} />}
      </div>
    );
  }
  handlerClickFavor = () => {
    
    //функция нажатия на кнопку "избранное" добавляет или удаляет город из localStorage
    function wordInArr(word, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (word === arr[i]) {
          return true;
        }
      }
      return false;
    }
    if (localStorage.getItem("Cityes") === null) {
      localStorage.setItem("Cityes", this.state.city.toString());
      return
    }
    if (localStorage.getItem("Cityes").split(',')[0] === '') {
      localStorage.setItem("Cityes", this.state.city.toString());
      return
    }

    if (
      wordInArr(
        this.state.city.toString(),
        localStorage.getItem("Cityes").split(",")
      )
    ) {
      this.setState({ classesFavor: 'button-to-favor' });
      let storageStr = localStorage.getItem("Cityes");
      let word = this.state.city.toString();
      let storageArr = storageStr.split(",");
      let indexOfWord = storageArr.indexOf(word);
      storageArr.splice(indexOfWord, 1);
      let storageSet = new Set(storageArr);
      localStorage.setItem("Cityes", Array.from(storageSet).toString());
      
    } else {
      
      this.setState({ classesFavor: 'button-to-favor__done' });
      if (localStorage.getItem("Cityes")[0] === null) {
        localStorage.setItem("Cityes", this.state.city.toString());
      }
      if (localStorage.getItem("Cityes") !== null) {
        let storageStr =
          localStorage.getItem("Cityes") + "," + this.state.city.toString();
        let storageArr = storageStr.split(",");
        let storageSet = new Set(storageArr);
        localStorage.setItem("Cityes", Array.from(storageSet).toString());
        
      }
    }console.log(this.state.classesFavor)
  } ;
}
export default App;
