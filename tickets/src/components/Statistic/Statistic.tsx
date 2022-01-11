type Props = {
  title: string,
  value: {
    count: number,
    percentage?: number
  },
}

export function Statistic({ title, value }: Props) {
  return (
    <div>
      {title}
      :
      {' '}
      {value.count}
      ,
      {' '}
      { value?.percentage && `${value.percentage}%` }
    </div>
  );
}
