import { useEffect, useState } from 'react'
import convertToFlag from '../utils/convertToFlag'
import useLocalStorageState from './useLocalStorageState'

export function useWeather(location) {
    const [weather, setWeather] = useLocalStorageState({}, 'weather')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // ms fetch delay
    const ms = 200

    useEffect(() => {
        const controller = new AbortController()

        // Delay the fetching of weather
        const timer = setTimeout(() => {
            async function fetchWeather(location) {
                try {
                    if (location?.length > 1) {
                        setError(false)
                        // 1) Getting location (geocoding)
                        const geoRes = await fetch(
                            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
                            { signal: controller.signal },
                        )
                        const geoData = await geoRes.json()

                        if (!geoData.results)
                            throw new Error('Location not found')

                        const {
                            latitude,
                            longitude,
                            timezone,
                            name,
                            country_code,
                            id,
                        } = geoData.results.at(0)

                        // Only start fetching if the location is different
                        if (Number(weather.id) !== Number(id)) {
                            setIsLoading(true)

                            // 2) Getting actual weather
                            const weatherRes = await fetch(
                                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
                                { signal: controller.signal },
                            )
                            const weatherData = await weatherRes.json()
                            weatherData.daily = {
                                ...weatherData.daily,
                                displayLocation: `${name} ${convertToFlag(
                                    country_code,
                                )}`,
                                locationName: location.toLowerCase(),
                                id,
                            }

                            setWeather(weatherData.daily)
                        }
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        setWeather({})
                        setError(err)
                    }
                } finally {
                    setIsLoading(false)
                }
            }

            if (location?.length < 2 && !weather.weathercode) {
                setWeather({})
                setError(false)
            }

            fetchWeather(location)
        }, ms)

        return () => {
            controller.abort()
            clearTimeout(timer)
        }
    }, [
        location,
        setWeather,
        weather.weathercode,
        weather.locationName,
        weather.id,
    ])

    return { weather, isLoading, error }
}
