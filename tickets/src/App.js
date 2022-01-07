import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { New } from "./pages/New";
import { Ticket } from "./pages/Ticket";
import { Tickets } from "./pages/Tickets";
import { getUser } from "./redux/selectors";

const getRoutes = (user) => ({
  '/dashboard': user ? <Dashboard /> : <Navigate to="/"/>,
  '/tickets': user ? <Tickets /> : <Navigate to="/"/>,
  '/tickets/:id': user ? <Ticket /> : <Navigate to="/"/>,
  '/new': user ? <New /> : <Navigate to="/"/>,
  '/': !user ? <Login /> : <Navigate to="/dashboard"/>,
  '*': <Navigate to="/"/>
})

export const App = () => {
  const user = useSelector(getUser)

  return (
    <Routes>
      { Object.entries(getRoutes(user)).map(([path, element]) => <Route key={path} path={path} element={element} />) }
    </Routes>
  );
}
