const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Define routes
app.use('/api/weather', weatherRoutes);

module.exports = app;
