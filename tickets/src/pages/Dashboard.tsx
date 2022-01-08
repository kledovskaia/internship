import { useDispatch } from 'react-redux';
import { logout } from '../redux/thunks/auth';

function Dashboard() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logout());

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
