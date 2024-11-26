export async function GET() {
  const APIKEY = process.env.WEATHERAPI_KEY;

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=Moreno_Valley&aqi=no`
  );

  const data = await response.json();

  return new Response(JSON.stringify(data));
}
