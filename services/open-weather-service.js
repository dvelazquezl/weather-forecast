import Location from "@/pages/models/location";
import axios from "axios";

const baseURL = "https://api.openweathermap.org";
const appid = process.env.openWeatherApiKey;

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
    console.log("full response", response.data);
    if (response.data.length === 0) {
      throw Error("No location found");
    }
    return new Location(response.data[0]);
  } catch (error) {
    console.error(error);
    return new Location();
  }
}

export function getCurrentForecast(params) {
  return axios.get("data/3.0/onecall", params);
}
