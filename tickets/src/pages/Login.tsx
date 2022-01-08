import { useDispatch } from 'react-redux';
import { login } from '../redux/thunks/auth';

function Login() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(login());

  return (
    <>
      <h1>Login Page</h1>
      <button type="button" onClick={handleClick}>
        login with Google
      </button>
    </>
  );
}

export default Login;
