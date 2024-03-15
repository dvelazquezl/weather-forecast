import Location from "@/pages/models/location";
import Weather from "@/pages/models/weather";
import axios from "axios";

const baseURL = "https://api.openweathermap.org";
const appid = process.env.openWeatherAppId;

/**
 * Retrieves geocoding information for a given city.
 * @param {string} city - The name of the city.
 * @returns {Promise<Location>} A promise that resolves to a Location object representing the geocoding information.
 */
export async function getGeocoding(city) {
  if (!city) {
    return new Location();
  }
  try {
    const response = await axios.get(`${baseURL}/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 1,
        appid,
      },
    });
    if (response.data.length === 0) {
      throw Error("No location found");
    }
    return new Location(response.data[0]);
  } catch (error) {
    console.error(error);
    return new Location();
  }
}

/**
 * Retrieves reverse geocoding information for a given location.
 *
 * @param {Object} location - The location object containing latitude and longitude.
 * @returns {Promise<Location>} - A promise that resolves to a Location object representing the reverse geocoding information.
 * @throws {Error} - If no location is found.
 */
export async function getReverseGeocoding(location) {
  try {
    const response = await axios.get(`${baseURL}/geo/1.0/reverse`, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        limit: 1,
        appid,
      },
    });
    if (response.data.length === 0) {
      throw Error("No location found");
    }
    return new Location(response.data[0]);
  } catch (error) {
    console.error(error);
    return new Location();
  }
}

/**
 * Retrieves the current weather forecast for a given location.
 *
 * @param {Object} location - The location object containing latitude and longitude.
 * @returns {Promise<Weather|Error>} - A promise that resolves to a Weather object representing the current forecast,
 *                                      or rejects with an Error if no weather data is found.
 */
export async function getCurrentForecast(location) {
  try {
    const response = await axios.get(`${baseURL}/data/3.0/onecall`, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        exclude: "minutely,hourly,daily,alerts",
        units: "metric",
        appid,
      },
    });
    return new Weather(response.data);
  } catch (error) {
    console.error(error);
    return Error("No weather data found");
  }
}
