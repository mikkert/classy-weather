import { useWeather } from './hooks/useWeather'
import Weather from './components/Weather'
import Input from './components/Input'
import useLocalStorageState from './hooks/useLocalStorageState'

export default function App() {
    const [location, setLocation] = useLocalStorageState('', 'location')
    const { weather, isLoading, error } = useWeather(location)

    return (
        <div className='app'>
            <h1>Classy Weather</h1>
            <Input
                location={location}
                onChangeLocation={(e) => setLocation(e.target.value)}
            />

            {isLoading && <p className='loader'>Loading...</p>}
            {error && <p className='loader'>Error: {error.message}</p>}

            {weather.weathercode && !isLoading && <Weather weather={weather} />}
        </div>
    )
}
