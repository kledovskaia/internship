import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GridContainer, GridFullWidth, GridSmallWidth } from '../styles';
import { Statistic } from '../components/Statistic/Statistic';
import { calculateStatistic, getChartData } from '../utils/utils';
import { getTicketCollection, getUser } from '../redux/selectors';
import Chart from '../components/Chart/Chart';

function Dashboard() {
  const user = useSelector(getUser);
  const allTickets = useSelector(getTicketCollection);
  const [totalStatistic, setTotalStatistic] = useState<TStatistic>();
  const [myStatistic, setMyStatistic] = useState<TStatistic>();
  const [chartData, setChartData] = useState<TChartData>();

  useEffect(() => {
    if (!allTickets) return;
    setTotalStatistic(() => calculateStatistic(allTickets));
    const myTickets = allTickets.filter((ticket) => ticket.author.id === user.id);
    setMyStatistic(() => calculateStatistic(myTickets));
    setChartData(getChartData(14, allTickets));
  }, [allTickets]);

  return (
    (
      <GridContainer>
        {totalStatistic && Object.entries(totalStatistic).map(([title, value]) => (
          <GridSmallWidth key={title} elevation={3}>
            <Statistic {...{ title: `Total ${title[0].toUpperCase() + title.slice(1)}`, value }} />
          </GridSmallWidth>
        ))}
        <GridFullWidth elevation={3}>
          <Chart data={chartData} />
        </GridFullWidth>
        {myStatistic && Object.entries(myStatistic).map(([title, value]) => (
          <GridSmallWidth key={title} elevation={3}>
            <Statistic {...{ title: title[0].toUpperCase() + title.slice(1), value }} />
          </GridSmallWidth>
        ))}
      </GridContainer>
    )
  );
}

export default Dashboard;
