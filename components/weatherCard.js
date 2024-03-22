import { useEffect, useState } from "react";
import {
  getCurrentForecast,
  getGeocoding,
  getReverseGeocoding,
} from "@/services/open-weather-service";
import { Card, Spinner, TextInput, Tooltip } from "flowbite-react";
import Image from "next/image";
import Weather from "../models/weather";
import Location from "../models/location";
import CustomChart from "./chart";

export default function WeatherCard() {
  const dateTime = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const [city, setCity] = useState("");
  const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(new Location());
  const [weather, setWeather] = useState(new Weather());
  const [chartData, setChartData] = useState({ labels: [], temperatures: [] });

  useEffect(() => {
    if (navigator.geolocation) {
      setGettingCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getReverseGeocoding({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
            .then(setLocation)
            .catch(console.error)
            .finally(() => setGettingCurrentLocation(false));
        },
        (error) => {
          console.error(error);
          setGettingCurrentLocation(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    getCurrentForecast(location).then(setWeather).catch(console.error);
  }, [location]);

  useEffect(() => {
    setChartData({
      labels: weather.hourly?.map((hour) => hour.time),
      temperatures: weather.hourly?.map((hour) => hour.temperature),
    });
  }, [weather]);

  const handleSearch = (event) => {
    if (event.key !== "Enter") return;
    setLoading(true);
    getGeocoding(city)
      .then(setLocation)
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  return (
    <Card className="w-[800px] font-light">
      {gettingCurrentLocation ? (
        <div className="flex justify-center">
          <p className="mr-4">Getting your location. Please allow.</p>
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Tooltip
                  content="Press enter to search"
                  style="light"
                  placement="bottom"
                >
                  <TextInput
                    id="city"
                    type="text"
                    placeholder="Search another city"
                    sizing="md"
                    required
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </Tooltip>
                {loading && <Spinner className="ml-2" size="sm" />}
              </div>
            </div>
            <div className="mb-4">
              <p className=" font-semibold">
                {location?.name}&sbquo; {location?.countryCode}
              </p>
              <p className="text-sm">{dateTime}</p>
              <div className="flex justify-center items-center">
                <div className="text-right">
                  <p className="text-2xl font-semibold">
                    {weather?.temperature}&ordm;&nbsp;C
                  </p>
                  <p className="text-xs">
                    Feels like {weather?.feelsLike}&ordm;&nbsp;C
                  </p>
                  <p className="capitalize text-xs">{weather?.description}</p>
                </div>
                <Image
                  src={weather.getIconImage()}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <p>Humidity</p>
                <p>{weather?.humidity}&nbsp;%</p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p>{weather?.windSpeed}&nbsp;k/h</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <CustomChart
              labels={chartData.labels}
              temperatures={chartData.temperatures}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
