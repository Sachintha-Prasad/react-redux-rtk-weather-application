import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { fetchWeather, weatherSelector } from "./weatherSlice"
import { Input } from "antd"

const WeatherComponent = () => {
    const { weather, isLoading, error } = useAppSelector(weatherSelector)
    const dispatch = useAppDispatch()
    const [searchInput, setSearchInput] = useState("")

    const handleWeatherSearch = () => {
        if (searchInput) {
            dispatch(fetchWeather(searchInput))
        }
    }

    useEffect(() => {
        dispatch(fetchWeather("New york"))
    }, [dispatch])

    return (
        <div>
            <Input.Search
                placeholder="input search text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onSearch={handleWeatherSearch}
                loading={isLoading}
                allowClear
                required
                enterButton
                size="large"
            />
            <div>
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    weather && <div>Weather Data: {weather?.name}</div>
                )}
            </div>
        </div>
    )
}

export default WeatherComponent
