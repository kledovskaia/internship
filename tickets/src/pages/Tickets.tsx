import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { getTicketCollection } from '../redux/selectors';
import TicketPreview from '../components/TicketPreview/TicketPreview';

export default function Tickets() {
  const ticketCollection = useSelector(getTicketCollection);
  const [pageSize, setPageSize] = useState<number>(8);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <Paper elevation={3}>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>
      {/* {ticketCollection.map((ticket) => (
        <TicketPreview key={ticket.id} ticket={ticket} />
      ))} */}
      <div style={{ height: '75vh', width: '100%' }}>
        {// eslint-disable-next-line
         /* @ts-ignore */}
        <DataGrid
          sx={{ border: 0 }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[8, 16, 32, 64]}
          pagination
          {...data}
        />
      </div>
    </Paper>
  );
}
