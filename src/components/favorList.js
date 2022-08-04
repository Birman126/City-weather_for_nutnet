import Favor from "./favor";

export default function FavorList(props) {
    
    if (localStorage.getItem("Cityes")===null) {
        return}
        else {
    var cityArr = localStorage.getItem("Cityes").split(",")}
    
    
    return(
        
        <div className="favor-weather-main">
            
            {cityArr.map((item) => {
                
                return (<Favor handlerClickToWeather={props.handlerClickToWeather} city={item} key={(cityArr.indexOf(item))}/>)
            })}
        </div>
            
            )
}