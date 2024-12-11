"use client";

import { useState } from "react";

const Page = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState("");
  const [historicalWeatherData, setHistoricalWeatherData] = useState("");
  const [cityName, setCityName] = useState("");

  const fetchData = async () => {
    try {
      // Fetch current weather data
      const currentResponse = await fetch("/api/currentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });

      // Check if the response is not ok
      if (!currentResponse.ok) {
        throw new Error("Failed to fetch current weather data");
      }

      // Parse the JSON response
      const currentData = await currentResponse.json();
      console.log(currentData);
      const cityLat = currentData.location.lat;
      const cityLon = currentData.location.lon;

      // Update state with the current weather data
      setCurrentWeatherData(JSON.stringify(currentData));

      // Fetch historical weather data using the latitude and longitude
      const historicalResponse = await fetch("/api/historicalData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat: cityLat, lon: cityLon }),
      });

      // Check if the response is not ok
      if (!historicalResponse.ok) {
        throw new Error("Failed to fetch historical weather data");
      }

      // Parse the JSON response
      const historicalData = await historicalResponse.json();
      console.log(historicalData);

      // Update state with the historical weather data
      setHistoricalWeatherData(JSON.stringify(historicalData));
    } catch (error) {
      // Handle any errors that occur during the fetch operations
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <input
        type='text'
        onChange={(e) => {
          setCityName(e.target.value);
        }}
        className='border-2 border-gray-500'
      />
      <h1>{cityName}</h1>
      <button
        onClick={fetchData}
        className='bg-blue-500 rounded-full px-4 py-2 '
      >
        RUN!
      </button>

      <h1 className='border-b-4 border-black'>{currentWeatherData}</h1>
      <h1>{historicalWeatherData}</h1>
    </>
  );
};

export default Page;
