import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { calculateStatistic } from '../utils/utils';
import { getMyTickets, getTicketCollection, getUser } from '../redux/selectors';

function Dashboard() {
  const user = useSelector(getUser);
  const allTickets = useSelector(getTicketCollection);
  const [totalStatistic, setTotalStatistic] = useState<TStatistic>();
  const [myStatistic, setMyStatistic] = useState<TStatistic>();

  useEffect(() => {
    if (!allTickets) return;
    setTotalStatistic(() => calculateStatistic(allTickets));
    const myTickets = allTickets.filter((ticket) => ticket.author.id === user.id);
    setMyStatistic(() => calculateStatistic(myTickets));
  }, [allTickets]);

  return (
    (
      <>
        {totalStatistic && Object.entries(totalStatistic).map(([key, value]) => (
          <div>
            {key}
            :
            {' '}
            {JSON.stringify(value)}
          </div>
        ))}
        {myStatistic && Object.entries(myStatistic).map(([key, value]) => (
          <div>
            {key}
            :
            {' '}
            {JSON.stringify(value)}
          </div>
        ))}
      </>
      // <Statistic count={} title={} percentage={} />
    )
  );
}

export default Dashboard;
