const defaultLocation = {
  name: "London",
  country: "GB",
  lat: 51.5073219,
  lon: -0.1276474,
};
class Location {
  constructor(apiResponse = defaultLocation) {
    this.name = apiResponse.name;
    this.countryCode = apiResponse.country;
    this.latitude = apiResponse.lat;
    this.longitude = apiResponse.lon;
  }
}

export default Location;
