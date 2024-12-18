'use client';

import { useState } from 'react';

import { Line } from 'react-chartjs-2';
import { cityTempAvgData } from '@/interfaces/cityData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ tempAvgs }: { tempAvgs: cityTempAvgData }) => {
  const [selectedYear, setSelectedYear] =
    useState<keyof cityTempAvgData>('currentYear');

  const chartMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const options = {
    scales: {
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  const lineChartData = {
    labels: [...chartMonths],
    datasets: [
      {
        label: 'Year One',
        data: tempAvgs[selectedYear],
        borderColor: 'rgb(255, 0, 0)',
      },

    ],
  };

  return (
    <div className='bg-gray-400 p-5'>
      <div className='grid grid-cols-6 gap-2 mb-4'>
        <button
          onClick={() => setSelectedYear('currentYear')}
          className='p-2 bg-white rounded-xl'
        >
          current
        </button>
        <button
          onClick={() => setSelectedYear('yearOne')}
          className='p-2 bg-white rounded-xl'
        >
          year 1
        </button>
        <button
          onClick={() => setSelectedYear('yearTwo')}
          className='p-2 bg-white rounded-xl'
        >
          year 2
        </button>
        <button
          onClick={() => setSelectedYear('yearThree')}
          className='p-2 bg-white rounded-xl'
        >
          year 3
        </button>
        <button
          onClick={() => setSelectedYear('yearFour')}
          className='p-2 bg-white rounded-xl'
        >
          year 4
        </button>
        <button
          onClick={() => setSelectedYear('yearFive')}
          className='p-2 bg-white rounded-xl'
        >
          year 5
        </button>
      </div>
      <div className='bg-white'>
        <Line options={options} data={lineChartData} />
      </div>
    </div>
  );
};

export default LineChart;
