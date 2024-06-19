import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/weather/city/${city}`);
        return response.data;
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error);
        } else {
            return rejectWithValue(err.message);
        }
    }
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
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchHistory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
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
