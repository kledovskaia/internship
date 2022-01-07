import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { New } from "./pages/New";
import { Ticket } from "./pages/Ticket";
import { Tickets } from "./pages/Tickets";

export const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/tickets" element={<Tickets />}/>
      <Route path="/tickets/:id" element={<Ticket />}/>
      <Route path="/new" element={<New />}/>
      <Route path="/" element={<h1>Hello world!</h1>}/>
      <Route path="*" element={<Navigate to="/dashboard"/>}/>
    </Routes>
  );
}
