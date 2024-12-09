/**
 * Fetches the current weather data for requested city using the WeatherAPI.
 * Returns a JSON response with the weather data or an error message if the API key is missing.
 */

export async function GET() {
  const APIKEY = process.env.WEATHERAPI_KEY;
  if (!APIKEY) {
    return new Response(JSON.stringify({ error: "API key is missing" }), {
      status: 500,
    });
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=Moreno_Valley&aqi=no`
  );

  const data = await response.json();

  return new Response(JSON.stringify(data));
}
