import React, { useEffect, useState } from 'react';
import { FaSpinner, FaSearch } from 'react-icons/fa';
import Card from '../Card';
require('dotenv').config();

const api = {
    key: process.env.REACT_APP_API_KEY,
    base:'https://api.openweathermap.org/data/2.5/'
}

export default function Input(){
 const [input, setInput] = useState();
 const [weather, setWeather] = useState('');
 const [loading_animation, setLoadingAnimation] = useState(false);
 const [error, setError] = useState(false);

    async function search () {
        
        try {
            if (input == undefined ) throw new Error('Empty');
            setLoadingAnimation(true); 

            const response = await fetch(`${api.base}weather?q=${input}&units=metric&appid=${api.key}`);
            const data = await response.json();
            
            if (response.status != 200) { throw new Error('Not found'); }

            setWeather(data);
            setInput('');
                    
        } catch (error) {
            setError(true);
        } finally {
            setLoadingAnimation(false);
        }
    }

    useEffect(() => {
        setError(false);
    }, [input])

    return(
        <div className="container">
            <div className={`input-box ${error ? 'input-box-erro' : '' }`}>
                <input
                type="text" 
                placeholder="buscar cidade"
                value={input}
                onChange={e => setInput(e.target.value)}/>

                <div onClick={search} className="icon-search">
                    {!loading_animation ? (
                        <FaSearch color="#DDD" size={22}/>
                    ) : (
                        <FaSpinner className="spin" color="#DDD" size={22}/>
                    )
                    }
                </div>
            </div>

            {weather.main != undefined &&  <Card  weather={weather}/>}
        </div>
    );  
}