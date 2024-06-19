import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

interface WeatherState {
    data: any;
    history: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    history: [],
    status: 'idle',
    error: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
    const response = await axiosInstance.get(`/weather/city/${city}`);
    return response.data;
});

export const fetchHistory = createAsyncThunk('weather/fetchHistory', async () => {
    const response = await axiosInstance.get('/weather/history');
    return response.data;
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(fetchHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.history = action.payload;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export default weatherSlice.reducer;
