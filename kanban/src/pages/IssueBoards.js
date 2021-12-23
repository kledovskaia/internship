import { useCallback } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Board } from '../components/Board'
import * as actions from '../redux/AC'

export function IssueBoards() {
  const { projectId } = useParams()
  const state = useSelector((state) => state.projects[projectId]?.issueBoards)
  const dispatch = useDispatch()

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result

      if (!destination) {
        return
      }
      const sInd = +source.droppableId
      const dInd = +destination.droppableId

      dispatch(
        actions.moveIssue({
          id: projectId,
          source,
          destination,
          ...(sInd !== dInd ? { sInd, dInd } : {}),
        })
      )
    },
    [state]
  )

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state?.map((board, index) => (
            <Board key={index} board={board} boardIndex={index} />
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}
