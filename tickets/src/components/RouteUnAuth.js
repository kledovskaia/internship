import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom";
import { getUser } from "../redux/selectors"

export const RouteUnAuth = ({ path, element }) => {
  const user = useSelector(getUser);

  return <Route path={path} element={!user ? element : <Navigate to="/dashboard"/>}/>
}