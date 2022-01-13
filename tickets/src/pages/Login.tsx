import { useDispatch } from 'react-redux';
import { LoginButton, LoginContainer } from '../styles';
import { login } from '../redux/thunks/auth';

function Login() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(login());

  return (
    <LoginContainer>
      <LoginButton onClick={handleClick}>
        Login with Google
      </LoginButton>
    </LoginContainer>
  );
}

export default Login;
