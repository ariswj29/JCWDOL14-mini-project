import 'chart.js/auto';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const dataLine = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Total Atandee Registration',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      tension: 0.1,
    },
  ],
};

export default function ChartLine() {
  return (
    <div>
      <Line data={dataLine} />
    </div>
  );
}
