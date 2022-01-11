import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     low: 4000,
//     high: 2400,
//     normal: 2400,
//   },
//   {
//     name: 'Page B',
//     low: 3000,
//     high: 1398,
//     normal: 2210,
//   },
//   {
//     name: 'Page C',
//     low: 2000,
//     high: 9800,
//     normal: 2290,
//   },
//   {
//     name: 'Page D',
//     low: 2780,
//     high: 3908,
//     normal: 2000,
//   },
//   {
//     name: 'Page E',
//     low: 1890,
//     high: 4800,
//     normal: 2181,
//   },
//   {
//     name: 'Page F',
//     low: 2390,
//     high: 3800,
//     normal: 2500,
//   },
//   {
//     name: 'Page G',
//     low: 3490,
//     high: 4300,
//     normal: 2100,
//   },
// ];

type Props = {
  data: TChartData,
}

export default function Chart({ data }: Props) {
  return (
    <BarChart
      width={1000}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Legend align="left" verticalAlign="top" />
      <XAxis dataKey="label" />
      <YAxis />
      {/* <Tooltip /> */}

      <Bar dataKey="low" stackId="a" fill="#ffc658" />
      <Bar dataKey="normal" stackId="a" fill="#82ca9d" />
      <Bar dataKey="high" stackId="a" fill="#8884d8" />
    </BarChart>
  );
}
