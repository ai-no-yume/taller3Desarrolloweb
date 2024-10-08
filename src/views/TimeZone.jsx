import { useState } from "react";

function TimeZone() {
    const [city, setCity] = useState('')
    const date = new Date();
    const newYork = {timeZone: 'America/New_York'};
    const newYorkTime = date.toLocaleString('en-US', newYork);

    const london = {timeZone: 'Europe/London'};
    const londonTime = date.toLocaleString('en-US', london);
    
    const handleChange = (e) => {
        setCity(e.target.value);
    }

    return (
        <>
            <select required name="Country" onChange={handleChange}>
                <option value="">Please select</option>
                <option value="America/New_York">New York</option>
                <option value="Europe/London">London</option>
                <option value="Asia/Hong_Kong">Hong Kong</option>
            </select>

            <h1>{newYorkTime}</h1>
            <h1>{londonTime}</h1>
            <h1>{city}</h1>
        </>
      );
}

export default TimeZone;