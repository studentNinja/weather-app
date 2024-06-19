const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

module.exports = app;
