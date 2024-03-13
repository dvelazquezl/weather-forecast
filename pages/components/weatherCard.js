import { useState } from "react";
import {
  getCurrentForecast,
  getGeocoding,
} from "@/services/open-weather-service";
import { Card, Label, Spinner, TextInput, Tooltip } from "flowbite-react";
import Weather from "../models/weather";
import Image from "next/image";

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
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(new Weather());

  const handleSearch = (event) => {
    if (event.key !== "Enter") return;
    setLoading(true);
    getGeocoding(city)
      .then(getCurrentForecast)
      .then((response) => {
        console.log(response.getIconImage());
        setWeather(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Card className="w-[800px] font-light">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-300 space-y-12">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="city" value="Your city" className="font-light" />
            </div>
            <div className="flex items-center mb-2">
              <Tooltip
                content="Press enter to search"
                style="light"
                placement="right"
              >
                <TextInput
                  id="city"
                  type="text"
                  placeholder="London"
                  sizing="md"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </Tooltip>
              {loading && <Spinner className="ml-2" size="sm" />}
            </div>
          </div>
          <div>
            <p>{dateTime}</p>
            <p>{weather?.temperature}&ordm;&nbsp;C</p>
            <Image
              src={weather?.getIconImage()}
              alt=""
              width={50}
              height={50}
            />
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
        <div className="bg-emerald-200 col-span-2">
          <p>CHART</p>
        </div>
      </div>
    </Card>
  );
}
