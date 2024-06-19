const Weather = require('../models/weather');
const e = require("express");

exports.saveWeatherData = async (req, res) => {
    try {
        if (req.apiError) {
            console.log(req.apiError);
            return  res.status(Number(req.apiError.status)).json({ error: req.apiError.message });
        } else {
            const weatherData = req.weatherData;
            const searchedCity = req.searchedCity;

            const weather = new Weather({ searchedCity, ...weatherData });
            await weather.save();

            res.json(weatherData);
        }


    } catch (error) {
        console.log(error)
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
