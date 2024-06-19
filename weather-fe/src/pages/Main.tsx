import React, { useState } from 'react';
import { fetchWeather } from '../features/weather/weatherSlice';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import Map from '../components/Map';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Main: React.FC = () => {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const weather = useAppSelector((state) => state.weather);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        if (e.target.value) {
            setError('');
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cityPattern = /^[a-zA-Z\s-]+$/;
        if (!city.trim()) {
            setError('Please enter a city name.');
            return;
        } else if (!cityPattern.test(city.trim())) {
            setError('Please enter correct city name.');
            return;
        }
        dispatch(fetchWeather(city));
    };

    const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(2);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Search Weather by City</Typography>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="City"
                        value={city}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Get Weather
                    </Button>
                </form>
                {weather.status === 'loading' && <Typography>Loading...</Typography>}
                {weather.status === 'succeeded' && weather.data && (
                    <Box mt={4} display="flex" flexDirection="row" justifyContent="space-between">
                        <Box flex={1} mr={2} component={Paper} elevation={3} padding={2}>
                            <Typography variant="h5">{weather.data.name}</Typography>
                            <Typography>Temperature: {kelvinToCelsius(weather.data.main.temp)}°C</Typography>
                            <Typography>Feels Like: {kelvinToCelsius(weather.data.main.feels_like)}°C</Typography>
                            <Typography>Weather: {weather.data.weather[0].description}</Typography>
                            <Typography>Humidity: {weather.data.main.humidity}%</Typography>
                            <Typography>Wind Speed: {weather.data.wind.speed} m/s</Typography>
                            <Typography>Visibility: {weather.data.visibility / 1000} km</Typography>
                            <Typography>Pressure: {weather.data.main.pressure} hPa</Typography>
                        </Box>
                        <Box flex={1} component={Paper} elevation={3}>
                            <Map />
                        </Box>
                    </Box>
                )}
                {weather.status === 'failed' && (
                    <Box mt={4}>
                        <Alert severity="error">{weather.error}</Alert>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Main;
