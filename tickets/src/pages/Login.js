import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getUser } from "../redux/selectors"
import { login } from "../redux/thunks/auth"

export const Login = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  if (user) return <Navigate to="/dashboard"/>;

  const handleClick = () => dispatch(login());

  return (
    <>
      <h1>Login Page</h1>
      <button onClick={handleClick}>login with Google</button>
    </>
  )
}