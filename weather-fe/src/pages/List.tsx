import React, { useEffect } from 'react';
import { fetchHistory, fetchWeather } from '../features/weather/weatherSlice';
import { Container, Typography, List, Box, Card, CardContent, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const HistoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const weather = useAppSelector((state) => state.weather);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    const handleItemClick = (city: string) => {
        dispatch(fetchWeather(city));
        navigate('/'); // Redirect to main page
    };

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Weather History</Typography>
                {weather.status === 'loading' && <Typography>Loading...</Typography>}
                {weather.status === 'succeeded' && weather.history && (
                    <List>
                        {weather.history.map((entry, index) => (
                            <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{entry.searchedCity}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(entry.createdAt).toLocaleString()}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleItemClick(entry.searchedCity)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Search Again
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </List>
                )}
                {weather.status === 'failed' && (
                    <Typography color="error">{weather.error}</Typography>
                )}
            </Box>
        </Container>
    );
};

export default HistoryList;
