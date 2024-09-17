import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../app/store"

type WeatherData = {
    main: {
        temp: number
        humidity: number
    }
    weather: {
        description: string
        icon: string
    }
    name: string
}

type WeatherState = {
    weather: WeatherData | null
    isLoading: boolean
    error: string | null
}

const initialState = {
    weather: null,
    isLoading: false,
    error: null
} satisfies WeatherState as WeatherState

// fetch weather data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d3fc7304d18a1d7db09ffae2fd0191ed`
        )
        if (response.status !== 200)
            throw new Error("weather data fetching error!")
        return response.data
    }
)

const weatherSlice = createSlice({
    name: "weatherReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.isLoading = true
            state.weather = null
            state.error = null
        })
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.isLoading = false
            state.weather = action.payload
            state.error = null
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false
            state.weather = null
            state.error = action.error.message ?? "Data fetching error"
        })
    }
})

export default weatherSlice.reducer
export const weatherSelector = (state: RootState) => state.weatherReducer
