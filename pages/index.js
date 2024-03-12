import { Button, Card, Label, TextInput } from "flowbite-react";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import { getGeocoding } from "@/services/open-weather-service";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log(city);
    getGeocoding(city)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <Card className="max-w-sm">
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="city" value="Your city" />
          </div>
          <TextInput
            id="city"
            type="text"
            placeholder="London"
            required
            helperText={<>Press enter to search.</>}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </Card>
    </main>
  );
}
