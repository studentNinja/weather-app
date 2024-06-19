import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../features/weather/weatherSlice';
import { RootState, AppDispatch } from '../app/store';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const HistoryList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const weather = useSelector((state: RootState) => state.weather);

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Weather History</Typography>
                {weather.status === 'loading' && <Typography>Loading...</Typography>}
                {weather.status === 'succeeded' && weather.history && (
                    <List>
                        {weather.history.map((entry, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${entry.searchedCity} - ${new Date(entry.createdAt).toLocaleString()}`} />
                            </ListItem>
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
