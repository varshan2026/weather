import { Fragment, useState, useEffect } from "react";
import sunny from "../assets/sunny.svg";
import cloud from "../assets/cloudy.svg";
import rain from "../assets/rainy.svg";
import snow from "../assets/snow.svg";
import strom from "../assets/strom.svg";
import thunder from "../assets/thunder.svg";
import windspeed from "../assets/windspeed.svg";
import Humidity from "../assets/humidity.svg"
import axios from "axios";

function Weather(){

    const[location, setlocation] = useState('');
    const[temp, settemp] = useState();
    const[speed, setspeed] = useState();
    const [humid, sethumid] = useState();
    const [descp, setdescp] = useState();
    const [displayedLocation, setDisplayedLocation] = useState("");
    const[weatherimage, setweatherimage] = useState('');

    const handlelocation = (event) => {
        setlocation(event.target.value)
    }

    const getWeatherImage = (description) => {

        const lowerDesc = description.toLowerCase();

        if (lowerDesc.includes("clear")) return sunny;
        if (lowerDesc.includes("cloud")) return cloud;
        if (lowerDesc.includes("rain") || lowerDesc.includes("drizzle")) return rain;
        if (lowerDesc.includes("snow") || lowerDesc.includes("sleet")) return snow;
        if (lowerDesc.includes("thunderstorm")) return thunder;
        if (lowerDesc.includes("mist") || lowerDesc.includes("fog") || lowerDesc.includes("haze") || lowerDesc.includes("smoke")) return strom;
        if (lowerDesc.includes("squall") || lowerDesc.includes("tornado") || lowerDesc.includes("sand") || lowerDesc.includes("dust")) return strom; 
    };

    function getweather(city){
        const query = city || location;
        var weatherdata = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=0efe0b956e513b1217ad609add553e0e`);
        weatherdata.then(function(success){
            settemp((success.data.main.temp - 273.15).toFixed(2));
            setspeed(success.data.wind.speed);
            sethumid(success.data.main.humidity);
            setdescp(success.data.weather[0].description);
            setDisplayedLocation(query.toUpperCase());
            setweatherimage(getWeatherImage(success.data.weather[0].description));
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
    }

    useEffect(() => {
        getweather("new delhi");
    }, []);

    

    return(
        <Fragment>
            <div className="h-[100vh] flex justify-center items-center weatherapp">
                <div className="overlay"></div>
                <div className="p-8 inline-block w-100 dashboard">
                    <div className="flex gap-10">
                        <input type="text" value={location} onChange={handlelocation} className="focus:outline-none border border-gray-500 w-60 px-1 py-1 bg-white"/>
                        <button onClick={() => getweather()} className="border border-gray-500 bg-white px-2 py-1 font-medium">Check</button>
                    </div>

                    <div>
                        

                        <div className="mt-6 text-center text-white">

                        <img src={weatherimage} alt="Weather Icon" className="mt-8 mx-auto w-50 h-35" />

                            <h1 className="text-yellow-400 text-2xl font-bold mt-8 text-center">{displayedLocation}</h1>

                            <div className="mt-2 flex justify-center items-center gap-10">
                                <h2 className="text-3xl font-bold mt-4">{temp}°C</h2>
                                <h4 className="text-2xl font-medium mt-4">{descp}</h4>
                            </div>
                            
                        </div>

                        <div className="flex mt-10 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div><img src={Humidity} alt="wind" className="w-10"/></div>
                                <div className="text-white">
                                    <p className="font-bold">{humid}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div><img src={windspeed} alt="wind" className="w-10"/></div>
                                <div className="text-white">
                                    <p className="font-bold">{speed} km/h</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Weather;