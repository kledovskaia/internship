import { Route, Routes } from 'react-router-dom'
import { routes } from './data/routes'
import { PageContainer } from './containers/PageContainer'

export const App = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PageContainer>{route.element}</PageContainer>}
        />
      ))}
    </Routes>
  )
}
