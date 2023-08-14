import Day from './Day'

export default function Weather({
    weather: {
        displayLocation: location,
        temperature_2m_max: max,
        temperature_2m_min: min,
        time: dates,
        weathercode: codes,
    },
}) {
    return (
        <div>
            <h2>Weather {location}</h2>
            <ul className='weather'>
                {dates.map((date, i) => (
                    <Day
                        date={date}
                        max={max.at(i)}
                        min={min.at(i)}
                        code={codes.at(i)}
                        key={date}
                        isToday={i === 0}
                    />
                ))}
            </ul>
        </div>
    )
}
