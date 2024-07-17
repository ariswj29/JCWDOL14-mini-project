import 'chart.js/auto';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

export default function ChartLine(props: { data: number[] }) {
  const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Atandee Registration',
        data: props.data,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={dataLine} />
    </div>
  );
}
