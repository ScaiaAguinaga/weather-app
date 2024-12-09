import { NextRequest, NextResponse } from "next/server";

/**
 * Fetches the current weather data for requested city using the WeatherAPI.
 * Returns a JSON response with the weather data or an error message if the API key is missing.
 */

export async function POST(req: NextRequest) {
  const APIKEY = process.env.WEATHERAPI_KEY;

  if (!APIKEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const { city } = await req.json();

  if (!city) {
    return NextResponse.json({ error: "City is missing" }, { status: 400 });
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
