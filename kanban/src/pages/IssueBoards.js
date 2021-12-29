import { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Board } from '../components/Board/Board';
import { Filter } from '../components/Filter/Filter';
import { moveIssue } from '../redux/projectsSlice';
import { isProjectExist, selectIssueBoards } from '../redux/selectors';
import { ButtonLink, Container, FlexContainer, KanbanContainer, Title } from '../styles/common';

export function IssueBoards() {
  const { projectId } = useParams();
  const issueBoards = useSelector(selectIssueBoards(projectId));
  const projectExists = useSelector(isProjectExist(projectId));
  const [filteredState, setFilteredState] = useState(null);
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;

      dispatch(
        moveIssue({
          id: projectId,
          source,
          destination,
          ...(sInd !== dInd ? { sInd, dInd } : {}),
        })
      );
    },
    [issueBoards]
  );

  const updateFilteredState = (newState) => {
    setFilteredState(newState);
  };

  return projectExists ? (
    <Container>
      <FlexContainer>
        <Title>Issue Boards</Title>
        <ButtonLink primary="true" to={`/projects/${projectId}/new-issue`}>
          New issue
        </ButtonLink>
      </FlexContainer>
      <Filter data={issueBoards} setFilteredData={updateFilteredState} />
      <KanbanContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {(filteredState || issueBoards)?.map((board, index) => (
            <Board key={index} projectId={projectId} board={board} boardIndex={index} />
          ))}
        </DragDropContext>
      </KanbanContainer>
    </Container>
  ) : (
    <Navigate to={`/projects/${projectId}`} />
  );
}
