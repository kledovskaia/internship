import { NavLink } from "react-router-dom"

export const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/tickets">Tickets</NavLink></li>
      </ul>
    </nav>
  )
}