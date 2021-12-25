import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form } from '../components/Form'
import { updateIssue } from '../redux/projectsSlice'
import { Navigate } from 'react-router-dom'

export const Issue = () => {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const { projectId, issueId } = useParams()
  const projectExists = useSelector(
    (state) => !!state.projects.value[projectId]
  )
  const dispatch = useDispatch()
  const issue = useSelector((state) =>
    state.projects.value[projectId]?.issueBoards
      ?.flatMap((board) => board)
      ?.find((issue) => issue.id === issueId)
  )

  const onSubmit = (value) => {
    dispatch(
      updateIssue({
        id: projectId,
        issue: value,
      })
    )
    setIsOnEdit(false)
  }
  const handleClick = () => {
    setIsOnEdit((state) => !state)
  }

  if (!projectExists) return <Navigate to={`/project/${projectId}`} />

  if (!issue) return <h1>Issue Doesn't Exist</h1>

  return (
    <>
      {isOnEdit && (
        <Form type='issue' initialState={issue} onSubmit={onSubmit} />
      )}
      {!isOnEdit && (
        <>
          <button onClick={handleClick}>Edit</button>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
        </>
      )}
    </>
  )
}
