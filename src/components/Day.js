import getWeatherIcon from '../utils/getWeatherIcon'
import formatDate from '../utils/formatDate'

export default function Day({ date, max, min, code, isToday }) {
    return (
        <li className='day'>
            <span>{getWeatherIcon(code)}</span>
            <p>{isToday ? 'Today' : formatDate(date)}</p>
            <p>
                {Math.floor(min)}&deg; &mdash;
                <strong>{Math.ceil(max)}&deg;</strong>
            </p>
        </li>
    )
}
