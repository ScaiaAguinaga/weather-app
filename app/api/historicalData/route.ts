import { NextRequest, NextResponse } from "next/server";

const url =
  "https://meteostat.p.rapidapi.com/point/monthly?lat=52.5244&lon=13.4105&alt=43&start=2020-01-01&end=2020-12-31";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY as string,
    "x-rapidapi-host": "meteostat.p.rapidapi.com",
  },
};

export async function POST(req: NextRequest) {
  const { lat, lon } = await req.json();

  console.log(lat, lon);

  const response = await fetch(url, options);
  const data = await response.json();

  return new Response(JSON.stringify(data));
}
