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
    // Parse the request body to get city name
    const { city } = await req.json();

    // Check if city is missing
    if (!city) {
      return NextResponse.json({ error: "City is missing" }, { status: 400 });
    }

    // Maker the API call to WeatherAPI to fetch current weather data
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`
    );

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data as a JSON response with status 200
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Log the error to the console
    console.error("Error fetching current weather data:", error);
    // Return an error message as a JSON response with status 500
    return NextResponse.json(
      { error: "Failed to fetch current weather data" },
      { status: 500 }
    );
  }
}
