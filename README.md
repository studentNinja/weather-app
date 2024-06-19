# Weather App

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone GIT URL
   cd wether_test/weather-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `weather-be` directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/weather-test
   PORT=8080
   OPENWEATHER_API_KEY=YOUR_KEY
   ```

4. Start the MongoDB server:

   ```bash
   mongod or mongosh
   ```

5. Run the backend server:

   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../weather-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `weather-fe` directory and add the following:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

4. Run the frontend development server:

   ```bash
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.


## API Endpoints

### Example Request


## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**

    - Ensure MongoDB is running.
    - Verify the `MONGODB_URI` in your `.env` file is correct.

2. **CORS Issues:**

    - Ensure the backend is configured to handle CORS requests.
    - Verify the `REACT_APP_API_BASE_URL` in your `.env` file is correct.

3. **Frontend not loading:**
    - Ensure the frontend development server is running on `http://localhost:3000`.
    - Check the console for any errors.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
