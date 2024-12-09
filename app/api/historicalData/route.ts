const url =
  "https://meteostat.p.rapidapi.com/point/hourly?lat=43.6667&lon=-79.4&alt=113&start=2020-01-01&end=2020-01-01&tz=America%2FToronto";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY as string,
    "x-rapidapi-host": "meteostat.p.rapidapi.com",
  },
};

export async function GET() {
  const response = await fetch(url, options);
  const data = await response.json();

  return new Response(JSON.stringify(data));
}
