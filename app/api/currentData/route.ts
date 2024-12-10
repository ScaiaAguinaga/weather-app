import { NextRequest, NextResponse } from "next/server";

/**
 * Fetches the current weather data for requested city using the WeatherAPI.
 * Returns a JSON response with the weather data or an error message if the API key is missing.
 */

export async function POST(req: NextRequest) {
  const APIKEY = process.env.WEATHERAPI_KEY;

  // Check if the API key is missing
  if (!APIKEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const { city } = await req.json();

    if (!city) {
      return NextResponse.json({ error: "City is missing" }, { status: 400 });
    }

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch current weather data" },
      { status: 500 }
    );
  }
}
