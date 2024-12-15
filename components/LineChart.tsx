import { Line } from 'react-chartjs-2';
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

const LineChart = ({
  tempAvgs,
  startMonth,
}: {
  tempAvgs: number[];
  startMonth: number;
}) => {
  const months = [
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

  // Create chartMonths array starting from startMonth-1 and including the next 11 months
  const chartMonths = [
    // Include the months from startMonth to the end of the year
    ...months.slice(startMonth - 1),
    // Include the months from the start of the year to startMonth
    ...months.slice(0, startMonth - 1),
  ].slice(0, 12);

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
        label: 'Average Temperature',
        data: tempAvgs,
        borderColor: 'rgb(255, 83, 73)',
      },
    ],
  };

  return (
    <div className='w-1/2'>
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default LineChart;
