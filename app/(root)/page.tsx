'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [cityName, setCityName] = useState('');

  // Handle key press event
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Check if cityName is not empty or null
      if (cityName !== '' || cityName !== null) {
        // Format the city name and route to the city page
        handleRouting(formatCityName(cityName));
      }
    }
  };

  // Format the city name to be URL-safe
  const formatCityName = (city: string) => {
    return city
      .trim()
      .toLowerCase()
      .replace(' ', '%20')
      .replace('-', '%20')
      .replace('_', '%20');
  };

  // Route to the city page with the formatted city name
  const handleRouting = (pathname: string) => {
    console.log('Routing to city page');
    router.push(`/city/${pathname}`);
  };

  return (
    <>
      <input
        type='text'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={handleKeyPress}
        className='border-2 border-gray-500'
      />
      <h1>{cityName}</h1>
    </>
  );
};

export default Home;
