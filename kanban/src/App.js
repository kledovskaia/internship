import { Navigate, Route, Routes } from 'react-router-dom'
import { BreadCrumbs } from './components/BreadCrumbs'
import { IssueBoards } from './pages/IssueBoards'
import { Projects } from './pages/Projects'
import { NewProject } from './pages/NewProject'
import { NewIssue } from './pages/NewIssue'
import { Project } from './pages/Project'
import { routes } from './data/routes'

export const App = () => {
  return (
    <>
      <BreadCrumbs />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  )
}
