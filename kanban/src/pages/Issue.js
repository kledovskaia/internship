import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form } from '../components/Form'
import * as actions from '../redux/AC'

export const Issue = () => {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const { projectId, issueId } = useParams()
  const dispatch = useDispatch()
  const issue = useSelector((state) =>
    state.projects[projectId]?.issueBoards
      ?.flatMap((board) => board)
      ?.find((issue) => issue.id === issueId)
  )

  const onSubmit = (value) => {
    dispatch(actions.updateIssue(value))
    setIsOnEdit(false)
  }
  const handleClick = () => {
    setIsOnEdit((state) => !state)
  }

  return issue ? (
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
  ) : (
    <h1>Issue Doesn't Exist</h1>
  )
}
