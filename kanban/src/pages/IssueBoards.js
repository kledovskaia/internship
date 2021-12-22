import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Board } from './Board'

export const IssueBoards = () => {
  const { projectId } = useParams()
  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )

  return !project ? (
    <h1>Project Doesn't Exist</h1>
  ) : (
    <>
      <Link to={`/projects/${projectId}/new-issue`}>New Issue</Link>
      {Object.entries(project.issueBoards).map(([title, issues]) => (
        <Board key={title} title={title} issues={issues} />
      ))}
    </>
  )
}
