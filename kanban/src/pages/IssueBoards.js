import { useCallback, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Board } from '../components/Board'
import { Filter } from '../components/Filter'
import * as actions from '../redux/AC'
import { ColumnContainer } from '../styles/common'

export function IssueBoards() {
  const { projectId } = useParams()
  const state = useSelector((state) => state.projects[projectId]?.issueBoards)
  const [filteredState, setFilteredState] = useState(null)
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

  const updateFilteredState = (newState) => {
    setFilteredState(newState)
  }

  return (
    <>
      <Filter data={state} setFilteredData={updateFilteredState} />
      <ColumnContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {(filteredState || state)?.map((board, index) => (
            <Board
              key={index}
              projectId={projectId}
              board={board}
              boardIndex={index}
            />
          ))}
        </DragDropContext>
      </ColumnContainer>
    </>
  )
}
