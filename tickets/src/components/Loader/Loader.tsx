import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { getLoading } from '../../redux/selectors';

export function Loader() {
  const loading = useSelector(getLoading);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
