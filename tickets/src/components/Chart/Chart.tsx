import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

type Props = {
  data: TChartData,
}

export default function Chart({ data }: Props) {
  return (
    <BarChart
      width={1200}
      height={500}
      data={data}
    >
      <Legend
        verticalAlign="top"
        height={50}
      />
      <XAxis dataKey="label" />
      <YAxis />
      <Bar dataKey="high" stackId="a" fill="#EB5757" />
      <Bar dataKey="normal" stackId="a" fill="#29CC97" />
      <Bar dataKey="low" stackId="a" fill="#F2C94C" />
    </BarChart>
  );
}
