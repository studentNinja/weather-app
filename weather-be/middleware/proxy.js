const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const weatherProxy = async (req, res, next) => {
    try {
        const city = req.params.city;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(url);
        req.weatherData = response.data;
        req.searchedCity = city;
        next();
    } catch (error) {
        console.log(error)
        req.apiError = { status: error.response.data.cod, message: error.response.data.message };
        next();
    }
};

module.exports = weatherProxy;
