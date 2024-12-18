'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import LineChart from '@/components/LineChart';

import { cityTempAvgData } from '@/interfaces/cityData';
import { populateData } from '@/utils/weatherData';

const CityWeatherData = () => {
  const [latestData, setLatestData] = useState('');
  const [historicData, setHistoricData] = useState('');
  const [tempAvgs, setTempAvgs] = useState<cityTempAvgData>({
    yearFive: [],
    yearFour: [],
    yearThree: [],
    yearTwo: [],
    yearOne: [],
    currentYear: [],
  });

  const params = useParams();
  const cityName = params.cityName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current weather data
        const latestRes = await fetch('/api/currentData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: cityName }),
        });

        // Check if the response is not ok
        if (!latestRes.ok) {
          throw new Error('Failed to fetch current weather data');
        }

        // Parse the JSON response
        const latestData = await latestRes.json();
        const cityLat = latestData.location.lat;
        const cityLon = latestData.location.lon;

        // Fetch historical weather data using the latitude and longitude
        const historicRes = await fetch('/api/historicalData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat: cityLat, lon: cityLon }),
        });

        // Check if the response is not ok
        if (!historicRes.ok) {
          throw new Error('Failed to fetch historical weather data');
        }

        // Parse the JSON response
        const historicData = await historicRes.json();

        // Update state with the weather data
        setLatestData(latestData);
        setHistoricData(historicData);

        // Extract average temperature values from the historic data
        const tempAvgVals = historicData.data.map(
          (item: { tavg: number | null }) => item.tavg
        );

        console.log(tempAvgVals);
        const newTemps = populateData({ data: tempAvgVals });
        console.log(newTemps);

        setTempAvgs({
          yearFive: newTemps.slice(0, 12),
          yearFour: newTemps.slice(12, 24),
          yearThree: newTemps.slice(24, 36),
          yearTwo: newTemps.slice(36, 48),
          yearOne: newTemps.slice(48, 60),
          currentYear: newTemps.slice(60),
        });
      } catch (error) {
        // Handle any errors that occur during the fetch operations
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <>
      <div className='border-b-4 border-black'>
        Latest Weather Data: {JSON.stringify(latestData)}
      </div>
      <div className='border-b-4 border-black'>
        Historical Weather Data: {JSON.stringify(historicData)}
      </div>
      <div className='border-b-4 border-black'>
        Avg Temps: {JSON.stringify(tempAvgs)}
      </div>

      <div className='w-1/2'>
        <LineChart tempAvgs={tempAvgs} />
      </div>
    </>
  );
};

export default CityWeatherData;
