import Favor from "./favor1";

export default function FavorList(props) {
    
    if (localStorage.getItem("Cityes")===null) {
        return}
        else {
    var cityArr = localStorage.getItem("Cityes").split(",")}
    
    
    return(
        
        <div className="favor-weather-main">
            
            {cityArr.map((item) => {
                
                return (<Favor city={item} key={(cityArr.indexOf(item))}/>)
            })}
        </div>
            
            )
}