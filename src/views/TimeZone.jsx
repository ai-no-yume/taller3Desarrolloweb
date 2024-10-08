function TimeZone({ onCompletion }) {
    const timeZones = new Map([
        [1, 'America/New_York'],
        [2, 'Europe/London'],
        [3, 'Asia/Hong_Kong'],
    ]);
    
    const date = new Date();
    const newYork = {timeZone: 'America/New_York'};
    const newYorkTime = date.toLocaleString('en-US', newYork);

    const london = {timeZone: 'Europe/London'};
    const londonTime = date.toLocaleString('en-US', london);
    

    return (
        <>
            <select required name="Country">
                <option value="1">Please select</option>
                <option value="2">New York</option>
                <option value="3">London</option>
                <option value="4">Hong Kong</option>
            </select>

            <h1>{newYorkTime}</h1>
            <h1>{londonTime}</h1>
        </>
      );
}

export default TimeZone;