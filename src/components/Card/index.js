import React, { useEffect, useState } from 'react';

export default function Card (props){
    const [weatherData, setWeatherData] = useState('');

    useEffect(() => {
        setWeatherData(props.weather);
    },[props.weather])
    
    const parseToInt = data => Math.floor(parseInt(data));

    return(
        <section>
            {weatherData.main != undefined && (
            <>
                <div className="text-card">
                    <div className="main-text">
                        <h2>{weatherData.name}</h2>
                        <h3>{parseToInt(weatherData.main.temp)}ºC</h3>
                    </div>

                    <ul>
                        <li>Sensação térmica: <span>{parseToInt(weatherData.main.feels_like)}º</span></li>
                        <li>Pressão: <span>{weatherData.main.pressure}hPa</span></li>
                        <li>Umidade: <span>{weatherData.main.humidity}%</span></li>
                        <li>Vento: <span>{parseToInt(weatherData.wind.speed)}m/s</span></li>
                    </ul>
                </div>

                <div className="icon-card">
                    <div className="icon">
                        <img src={`/images/icons/${weatherData.weather[0].icon}.svg`}  alt="Icone Clima"/>
                    </div>
                </div>
            </>
            )}
        </section>
    );  
}