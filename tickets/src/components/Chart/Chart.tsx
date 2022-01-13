import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { priorityColors } from '../../data/priorityColors';
import { Title3 } from '../../styles';
import {
  BarChartContainer, ChartContainer, ChartDate, ChartHeader,
} from './styles';

type Props = {
  data: TChartData,
}

const options = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
} as const;

export default function Chart({ data }: Props) {
  return (
    <ChartContainer>
      <ChartHeader>
        <Title3>Completed Trends</Title3>
        <ChartDate>
          as for
          {' '}
          {new Date().toLocaleDateString(undefined, options)}
          {' '}
          {new Date().toLocaleTimeString()}
        </ChartDate>
      </ChartHeader>
      <BarChartContainer>
        <BarChart
          width={700}
          height={350}
          data={data}
        >
          <XAxis dataKey="label" />
          <YAxis />
          {
            (['high', 'normal', 'low'] as const).map((priority) => (
              <Bar key={priority} dataKey={priority} stackId="a" fill={priorityColors[priority]} />
            ))
          }
          <Legend verticalAlign="top" />
        </BarChart>
      </BarChartContainer>
    </ChartContainer>
  );
}
