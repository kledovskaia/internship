import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { IssueLink } from '../../styles/common';
import { IssueInfo } from '../IssueInfo/IssueInfo';
import { Status } from '../Status/Status';
import { BoardContainer, BoardIssue, BoardList } from './styles';

const statuses = ['TO DO', 'IN PROGRESS', 'TEST', 'DONE'];

export const Board = ({ boardIndex, board, projectId }) => {
  return (
    <BoardContainer>
      <Status>{statuses[boardIndex]}</Status>
      <Droppable droppableId={`${boardIndex}`}>
        {(provided) => (
          <BoardList ref={provided.innerRef} {...provided.droppableProps}>
            {board.map((item) => (
              <Draggable key={item.id} draggableId={item.id} index={item.index}>
                {(provided) => (
                  <BoardIssue ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <IssueLink to={`/projects/${projectId}/issue-boards/${item.id}`}>
                      <IssueInfo issue={item} />
                    </IssueLink>
                  </BoardIssue>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </BoardList>
        )}
      </Droppable>
    </BoardContainer>
  );
};
