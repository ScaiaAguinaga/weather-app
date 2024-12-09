"use client";

import { useState } from "react";

const Page = () => {
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState("");

  const fetchData = async () => {
    // Fetch current data
    const response = await fetch("/api/currentData", {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    setInfo(JSON.stringify(data));

    // Fetch historical data
    const response2 = await fetch("/api/historicalData", {
      method: "GET",
    });

    const data2 = await response2.json();
    console.log(data2);
    setInfo2(JSON.stringify(data2));
  };

  return (
    <>
      <button
        onClick={fetchData}
        className='bg-blue-500 rounded-full px-4 py-2 '
      >
        RUN!
      </button>
      <h1>{info}</h1>
      <h1>{info2}</h1>
    </>
  );
};

export default Page;
