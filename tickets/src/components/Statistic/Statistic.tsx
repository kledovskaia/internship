import {
  StatisticContainer, StatisticCount, StatisticData, StatisticPercent, StatisticTitle,
} from './styles';

type Props = {
  title: string,
  value: {
    count: number,
    percentage?: number
  },
}

export function Statistic({ title, value }: Props) {
  return (
    <StatisticContainer>
      <StatisticTitle>
        {title}
      </StatisticTitle>
      <StatisticData>
        <StatisticCount>
          {value.count}
        </StatisticCount>
        { value?.percentage && (
        <StatisticPercent>
          {value.percentage}
          %
        </StatisticPercent>
        )}
      </StatisticData>
    </StatisticContainer>
  );
}
