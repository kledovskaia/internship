import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from '../components/Form'
import * as actions from '../redux/AC'

export const NewIssue = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()

  const onSubmit = (issue) => {
    dispatch(actions.newIssue({ id: projectId, issue }))
    navigate(`/projects/${projectId}/issue-boards`)
  }

  return <Form type='issue' onSubmit={onSubmit} />
}
