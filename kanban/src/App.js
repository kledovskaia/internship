import { Navigate, Route, Routes } from 'react-router-dom'
import { BreadCrumbs } from './components/BreadCrumbs'
import { IssueBoards } from './pages/IssueBoards'
import { Projects } from './pages/Projects'
import { NewProject } from './pages/NewProject'
import { NewIssue } from './pages/NewIssue'
import { Project } from './pages/Project'

export const App = () => {
  return (
    <>
      <BreadCrumbs />
      <Routes>
        <Route path='/new-project' element={<NewProject />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:projectId' element={<Project />} />
        <Route
          path='/projects/:projectId/issue-boards'
          element={<IssueBoards />}
        />
        <Route path='/projects/:projectId/new-issue' element={<NewIssue />} />
        <Route path='*' element={<Navigate to='/projects' />} />
      </Routes>
    </>
  )
}
