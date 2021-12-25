import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Form } from '../components/Form'
import * as actions from '../redux/AC'

export const NewIssue = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const projectExists = useSelector((state) => !!state.projects[projectId])

  const onSubmit = (issue) => {
    dispatch(actions.newIssue({ id: projectId, issue }))
    navigate(`/projects/${projectId}/issue-boards`)
  }

  return projectExists ? (
    <Form type='issue' onSubmit={onSubmit} />
  ) : (
    <Navigate to={`/projects/${projectId}`} />
  )
}
