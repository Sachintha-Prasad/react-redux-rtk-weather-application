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

const apiKey = process.env.REACT_APP_API_KEY

// fetch weather data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
            )
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
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
            state.error = action.payload
                ? JSON.stringify(action.payload)
                : action.error.message ?? "Data fetching error"
        })
    }
})

export default weatherSlice.reducer
export const weatherSelector = (state: RootState) => state.weatherReducer
