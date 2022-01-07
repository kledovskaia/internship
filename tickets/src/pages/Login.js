import { useDispatch } from "react-redux"
import { login } from "../redux/thunks/auth"

export const Login = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(login());

  return (
    <>
      <h1>Login Page</h1>
      <button onClick={handleClick}>login with Google</button>
    </>
  )
}