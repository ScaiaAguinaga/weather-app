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

const LineChart = ({ tempAvg }: { tempAvg: number[] }) => {
  const options = {
    scales: {
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  const lineChartData = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Average Temperature',
        data: tempAvg,
        borderColor: 'rgb(255, 83, 73)',
      },
    ],
  };

  return (
    <div className=''>
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default LineChart;
