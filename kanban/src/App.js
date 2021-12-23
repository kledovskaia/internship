import { Route, Routes } from 'react-router-dom'
import { routes } from './data/routes'
import { Page } from './pages/Page'

export const App = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<Page>{route.element}</Page>}
        />
      ))}
    </Routes>
  )
}
