"use client";

import { useState } from "react";

const Page = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState("");
  const [historicalWeatherData, setHistoricalWeatherData] = useState("");
  const [cityName, setCityName] = useState("");

  const fetchData = async () => {
    try {
      // Fetch current data
      const currentResponse = await fetch("/api/currentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });

      if (!currentResponse.ok) {
        throw new Error("Failed to fetch current weather data");
      }

      const currentData = await currentResponse.json();
      console.log(currentData);
      setCurrentWeatherData(JSON.stringify(currentData));
    } catch (error) {
      console.error("Error fetching current weather data:", error);
    }

    try {
      // Fetch historical data
      const historicalResponse = await fetch("/api/historicalData", {
        method: "GET",
      });

      if (!historicalResponse.ok) {
        throw new Error("Failed to fetch historical weather data");
      }

      const historicalData = await historicalResponse.json();
      console.log(historicalData);
      setHistoricalWeatherData(JSON.stringify(historicalData));
    } catch (error) {
      console.error("Error fetching historical weather data:", error);
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
