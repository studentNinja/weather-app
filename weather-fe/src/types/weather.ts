export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number| null;
        id: number| null;
        country: string| null;
        sunrise: number| null;
        sunset: number| null;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherHistory {
    _id: string;
    searchedCity: string;
    weatherData: WeatherData;
    createdAt: string;
    updatedAt: string;
}
