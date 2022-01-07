import { useDispatch } from "react-redux"
import { logout } from "../redux/thunks/auth"

export const Dashboard = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(logout())

  return (
    <>
    <h1>Dashboard</h1>
    <button onClick={handleClick}>Logout</button>
    </>
  )
}