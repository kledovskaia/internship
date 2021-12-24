import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Issue = () => {
  const { projectId, issueId } = useParams()
  const issue = useSelector((state) =>
    state.projects[projectId]?.issueBoards
      ?.flatMap((board) => board)
      ?.find((issue) => issue.id === issueId)
  )

  return (
    <>
      <h1>{issue?.title}</h1>
      <p>{issue?.description}</p>
    </>
  )
}
