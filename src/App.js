import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import Help from "./components/help";
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
    classesFavor: "button-to-favor",
    styleItem:'autocomplete_item autocomplete_item__none',
    listItem: 'Москва',
  };
  // listItem = 'Москва';
  styleItem = 'autocomplete_item autocomplete_item__none';
  allCity =['Москва', 'Ижевск', 'Лондон', 'Париж', 'Саратов', "Санкт-Петербург", ""]


searchItem = (item) => {
  
  if (item.length>2){
    this.setState({ styleItem: 'autocomplete_item' })
    // console.log(this.state.styleItem)
    // console.log(this.allCity[0].includes(item))
    
  for (let i=0; i<this.allCity.length; i++) {
    if (this.allCity[i].toLowerCase().includes(item.toLowerCase())) {
      this.setState({listItem: this.allCity[i]})
      console.log(this.state.styleItem)
      console.log(this.state.listItem)
    }
  }}
else {this.setState({ styleItem: 'autocomplete_item autocomplete_item__none' })
}

}

  handlerClickExample = () => {
    this.gettingWeather('Ижевск')
  }

  wordInArr = (word, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (word === arr[i]) {
        return true;
      }
    }
    return false;
  };

  gettingWeather = async (e) => {
    let city;
    if (typeof e === "object") {
      city = e.target.elements.city.value;
      e.preventDefault();
    }

    if (typeof e === "string") {
      city = e;
    }
    if (this.wordInArr(city, localStorage.getItem("Cityes").split(","))) {
      this.setState({ classesFavor: "button-to-favor button-to-favor__done" });
    } else {
      this.setState({ classesFavor: "button-to-favor" });
    }
    

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.state.API_KEY}&lang=ru`
      );

      const data = await api_url.json();
      // console.log(data);
      this.setState({ page1: false });
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + 12 + ":" + date.getMinutes();
      if (date.getMinutes() < 10) {
        sunset_date = date.getHours() + 12 + ":0" + date.getMinutes();
      }
      var temp = (data.main.temp - 273).toFixed(0);
      var temp_data = temp.toString() + "\xB0";
      var pressure = (data.main.pressure * 0.750062).toFixed(0);

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
    this.setState({ styleItem: 'autocomplete_item autocomplete_item__none' })
  };

  handlerClickToWeather = (item) => {
    this.gettingWeather(item);
  };

  render() {
    var storageArr = [];
    if (localStorage.getItem("Cityes") != null) {
      storageArr = localStorage.getItem("Cityes").split(",");
    } else {
      storageArr = [];
    }
    var infoStyle = 'header__none'
    if (this.state.page1) {
      infoStyle='header'
    }
    else {infoStyle = 'header header__none'}
    return (
      <div className="wrapper">
        {<Info handlerClickBack={this.handlerClickBack} infoStyle={infoStyle} />}
        {this.state.page1 && <Form weatherMethod={this.gettingWeather} searchItem={this.searchItem} styleItem={this.state.styleItem} listItem={this.state.listItem}/>}
        {this.state.page1 && !localStorage.getItem("Cityes")[0] && <Help handlerClickExample={this.handlerClickExample}/>}
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
        {this.state.page1 && localStorage.getItem("Cityes")[0] && (
          <FavorList
            handlerClickToWeather={this.handlerClickToWeather}
            API_KEY={this.state.API_KEY}
            storageArr={storageArr}
          />
        )}
      </div>
    );
  }

  handlerClickFavor = () => {
    //функция нажатия на кнопку "избранное" добавляет или удаляет город из localStorage

    if (
      localStorage.getItem("Cityes")[0] === null ||
      localStorage.getItem("Cityes").split(",")[0] === ""
    ) {
      localStorage.setItem("Cityes", this.state.city.toString());
      this.setState({ classesFavor: "button-to-favor button-to-favor__done" });
        return;
    }
    if (
      this.wordInArr(this.state.city, localStorage.getItem("Cityes").split(","))
    ) {
      this.setState({ classesFavor: "button-to-favor" });
      let storageStr = localStorage.getItem("Cityes");
      let word = this.state.city.toString();
      let storageArr = storageStr.split(",");
      let indexOfWord = storageArr.indexOf(word);
      storageArr.splice(indexOfWord, 1);
      let storageSet = new Set(storageArr);
      localStorage.setItem("Cityes", Array.from(storageSet).toString());
    } else {
      this.setState({ classesFavor: "button-to-favor button-to-favor__done" });
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
    }
  };
}
export default App;
