import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeZone = () => {
    const [city, setCity] = useState('');
    const [time, setTime] = useState('');
    const [deletedTimeZones, setDeletedTimeZones] = useState(new Map());
    const [deleteCityVisibility, setDeleteCityVisibility] = useState(false);
    const [inputFlag, setInputFlag] = useState('');

    useEffect(() => {
        const storedExcludedCities = JSON.parse(localStorage.getItem('excludedCities')) || [];
        const excludedMap = new Map(storedExcludedCities.map(city => [city, true]));
        setDeletedTimeZones(excludedMap);
    }, []);

    const cityIsExcluded = () => {
        if (deletedTimeZones.has(city)) {
            alert('The typed city is excluded');
            return true;
        }
        return false;
    };

    const handleDeleteCity = () => {
        setDeletedTimeZones((prevZones) => {
            const newMap = new Map(prevZones);
            newMap.set(inputFlag, true);

            const updatedExcludedCities = Array.from(newMap.keys());
            localStorage.setItem('excludedCities', JSON.stringify(updatedExcludedCities));

            return newMap;
        });
        setInputFlag('');
        setDeleteCityVisibility(false);
    };

    const isCityVoid = () => {
        if (city.trim() === '') {
            alert("A void field? That's not original");
            return true;
        }
        return false;
    };

    const handleSearch = async () => {
        if (isCityVoid()) return;
        if (cityIsExcluded()) return;

        const openweatherAPIKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;
        const timezonedbAPIKey = import.meta.env.VITE_TIMEZONEDB_KEY;

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherAPIKey}`);
            const { lon, lat } = response.data.coord;
            const timeResponse = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${timezonedbAPIKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
            setTime(new Date(timeResponse.data.formatted).toLocaleTimeString());
        } catch (error) {
            alert('Error fetching the time:', error);
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

            <button onClick={() => setDeleteCityVisibility(!deleteCityVisibility)}>Delete Time Zone</button>

            {deleteCityVisibility && (
                <div>
                    <input
                        type="text"
                        value={inputFlag}
                        onChange={(e) => setInputFlag(e.target.value)}
                        placeholder="Enter city to delete"
                    />
                    <button onClick={handleDeleteCity}>Confirm Delete</button>
                </div>
            )}
        </div>
    );
};

export default TimeZone;
