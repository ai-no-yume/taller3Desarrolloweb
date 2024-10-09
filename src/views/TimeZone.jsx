import React, { useState } from 'react';
import axios from 'axios';

const TimeZone = () => {
    const [city, setCity] = useState('');
    const [time, setTime] = useState('');

    const handleSearch = async () => {
        const openweatherAPIKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;
        const timezonedbAPIKey = import.meta.env.VITE_TIMEZONEDB_KEY;
        alert(openweatherAPIKey)
        try {
            // [openweathermap] learnings
            /*
            no openweathermap apiKey variable test
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=653e218dbd1d8afab739e45d098b3222`);
            */

            // Right Way
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherAPIKey}`);
            const { lon, lat } = response.data.coord;

            // [timezonedb] learnings
            /*
            no timezonedb apiKey variable test
            const timeResponse = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=UK9GPHDWU531&format=json&by=position&lat=${lat}&lng=${lon}`);
            */

           // Right Way
            const timeResponse = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${timezonedbAPIKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
            setTime(new Date(timeResponse.data.formatted).toLocaleTimeString());
        } catch (error) {
            console.error('Error fetching the time:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch}>Get Time</button>
            {time && <h2>Current Time in {city}: {time}</h2>}
        </div>
    );
};

export default TimeZone;
