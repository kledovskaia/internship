import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { New } from "./pages/New";
import { Ticket } from "./pages/Ticket";
import { Tickets } from "./pages/Tickets";
import { getUser } from "./redux/selectors";

const routes = ({
  '/dashboard': <Dashboard />,
  '/tickets': <Tickets />,
  '/tickets/:id': <Ticket />,
  '/new': <New />,
  '*': <Navigate to="/dashboard "/>
})

export const App = () => {
  const user = useSelector(getUser)

  if (!user) return (
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
  )

  return ( 
      <Page>
        <Sidebar />
        <Header />
        <Routes>
          { Object.entries(routes).map(([path, element]) => <Route key={path} path={path} element={element} />) }          
        </Routes>
      </Page>  
  );
}
