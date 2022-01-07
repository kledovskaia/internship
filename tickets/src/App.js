import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Edit } from "./pages/Edit";
import { Login } from "./pages/Login";
import { New } from "./pages/New";
import { Ticket } from "./components/Ticket/Ticket";
import { Tickets } from "./pages/Tickets";
import { getUser } from "./redux/selectors";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/Theme";

const routes = ({
  '/dashboard': <Dashboard />,
  '/tickets': <Tickets />,
  '/tickets/new': <New />,
  '/tickets/edit/:id': <Edit />,
  '/tickets/:id': <Ticket />,
  '*': <Navigate to="/dashboard "/>
})

export const App = () => {
  const user = useSelector(getUser)
  const toggleTheme = useContext(ThemeContext)

  if (!user) return (
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
  )


  return ( 
      <>
      <button onClick={toggleTheme}>Toggle theme</button>
        <Sidebar />
        <Header />
        <Routes>
          { Object.entries(routes).map(([path, element]) => <Route key={path} path={path} element={element} />) }          
        </Routes>
      </>  
  );
}
