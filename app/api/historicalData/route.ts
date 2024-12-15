import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetches the historical weather data for requested latitude and longitude using the Meteostat API.
 * Returns a JSON response with the weather data or an error message if the API key is missing.
 */

export async function POST(req: NextRequest) {
  const APIKEY = process.env.X_RAPIDAPI_KEY;

  const currentDate = new Date();

  // Start date is set to first day of current month last year
  const start = {
    year: currentDate.getFullYear() - 1,
    month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
    day: '01',
  };

  // Calculate the last day of the previous month
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // End date is set to last day of previous month
  const end = {
    year: currentDate.getFullYear(),
    month: (((currentDate.getMonth() + 11) % 12) + 1)
      .toString()
      .padStart(2, '0'),
    day: lastDay.getDate(),
  };

  // Check if the API key is missing
  if (!APIKEY) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }

  try {
    // Parse the request body to get latitude and longitude
    const { lat, lon } = await req.json();

    // Check if latitude or longitude is missing
    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude or longitude is missing' },
        { status: 400 }
      );
    }

    // Make the API call to Meteostat to fetch historical weather data
    const response = await fetch(
      `https://meteostat.p.rapidapi.com/point/monthly?lat=${lat}&lon=${lon}&start=${start.year}-${start.month}-${start.day}&end=${end.year}-${end.month}-${end.day}&units=imperial`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': APIKEY as string,
          'x-rapidapi-host': 'meteostat.p.rapidapi.com',
        },
      }
    );

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error('Failed to fetch historical weather data');
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data as a JSON response with status 200
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Log the error to the console
    console.error('Error fetching historical weather data:', error);

    // Return an error message as a JSON response with status 500
    return NextResponse.json(
      { error: 'Failed to fetch historical weather data' },
      { status: 500 }
    );
  }
}
