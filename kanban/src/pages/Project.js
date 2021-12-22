import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

export const Project = () => {
  const { projectId } = useParams()
  const project = useSelector((state) =>
    state.projects.find((project) => project.id === projectId)
  )

  return !project ? (
    <h1>Project Doesn't Exist</h1>
  ) : (
    <>
      <h1>{project.title}</h1>
      <Link to={`/projects/${projectId}/issue-boards`}>Issue Boards</Link>
    </>
  )
}
