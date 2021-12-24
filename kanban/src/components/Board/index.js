import { Draggable } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import { BoardContainer, BoardIssue, BoardList, BoardTitle } from './styles'

const titles = ['TO DO', 'IN PROGRESS', 'TEST', 'DONE']

export const Board = ({ boardIndex, board, projectId }) => {
  return (
    <BoardContainer>
      <BoardTitle>{boardIndex}</BoardTitle>
      <Droppable droppableId={`${boardIndex}`}>
        {(provided) => (
          <BoardList ref={provided.innerRef} {...provided.droppableProps}>
            {board.map((item) => (
              <Draggable key={item.id} draggableId={item.id} index={item.index}>
                {(provided) => (
                  <BoardIssue
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Link to={`/projects/${projectId}/issue-boards/${item.id}`}>
                      {item.content}
                    </Link>
                  </BoardIssue>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </BoardList>
        )}
      </Droppable>
    </BoardContainer>
  )
}
