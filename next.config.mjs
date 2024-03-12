/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  },
};

export default nextConfig;
