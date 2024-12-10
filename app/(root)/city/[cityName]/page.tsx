"use client";

import { useParams } from "next/navigation";

export default function CityWeatherData() {
  const params = useParams();

  const cityName = params.cityName;

  console.log(params);

  return <h1>Weather Data for {cityName}</h1>;
}
