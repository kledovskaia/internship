import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form } from '../components/Form'
import * as actions from '../redux/AC'

export const NewProject = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (state) => {
    const { payload } = dispatch(actions.createProject(state))
    navigate(`/projects/${payload.id}`)
  }

  return <Form type='project' onSubmit={onSubmit} />
}
