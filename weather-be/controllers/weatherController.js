const Weather = require('../models/weather');

exports.saveWeatherData = async (req, res) => {
    try {
        const weatherData = req.weatherData;
        const searchedCity = req.searchedCity;
        console.log(weatherData,searchedCity);
        const weather = new Weather({ searchedCity, ...weatherData });
        await weather.save();

        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save weather data' });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Weather.find().sort({ createdAt: -1 }).limit(100);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
