"use client";

import { useState } from "react";

const Page = () => {
  const [info, setInfo] = useState("");

  const fetchData = async () => {
    const response = await fetch("/api/currentData", {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    setInfo(JSON.stringify(data));
  };

  return (
    <>
      <button
        onClick={() => fetchData()}
        className='bg-blue-500 rounded-full px-4 py-2 '
      >
        RUN!
      </button>
      <h1>{info}</h1>
    </>
  );
};

export default Page;
