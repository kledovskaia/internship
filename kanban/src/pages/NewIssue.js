import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Form } from '../components/Form'
import { newIssue } from '../redux/projectsSlice'
import { v4 as uuidv4 } from 'uuid'

export const NewIssue = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const projectExists = useSelector(
    (state) => !!state.projects.value[projectId]
  )

  const onSubmit = (issue) => {
    dispatch(
      newIssue({
        id: projectId,
        issue: {
          ...issue,
          id: uuidv4(),
        },
      })
    )
    navigate(`/projects/${projectId}/issue-boards`)
  }

  return projectExists ? (
    <Form type='issue' onSubmit={onSubmit} />
  ) : (
    <Navigate to={`/projects/${projectId}`} />
  )
}
